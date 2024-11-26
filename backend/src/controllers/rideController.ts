import { Request, Response } from "express";
import { pool } from "../database";
import { GoogleMapsResponse } from "../interfaces/googleMaps";
import axios from "axios";
import {
    DriverRow,
    Driver,
    RideEstimateErrorResponse,
    RideEstimateRequest,
    RideEstimateResponse
} from "../interfaces/rideInterfaces";
import { RowDataPacket } from "mysql2";

class RideController {
    private createErrorResponse(
        code: string,
        description: string
    ): RideEstimateErrorResponse {
        return {
            error_code: code,
            error_description: description
        };
    }

    private async getAvailableDrivers(distance: number): Promise<Driver[]> {
        const [results] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM drivers"
        );
        const drivers = results as DriverRow[];

        return drivers
            .map((driver) => ({
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                    rating: driver.rating,
                    comment: driver.comment
                },

                km_tax: driver.km_tax
            }))
            .sort((a, b) => a.km_tax - b.km_tax);
    }

    private validateRequest({
        customer_id,
        origin,
        destination
    }: RideEstimateRequest): string | null {
        if (!origin || !destination || !customer_id) {
            return "Origem, Destino e ID do cliente são obrigatórios.";
        }
        if (origin === destination) {
            return "Origem e Destino não podem ser iguais.";
        }
        return null;
    }

    private async fetchRoute(
        origin: string,
        destination: string
    ): Promise<GoogleMapsResponse> {
        const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
        if (!googleMapsApiKey) {
            throw new Error(
                "A chave da API do Google Maps (GOOGLE_MAPS_API_KEY) não está configurada."
            );
        }
        const response = await axios.get<GoogleMapsResponse>(
            `https://maps.googleapis.com/maps/api/directions/json`,
            {
                params: {
                    origin,
                    destination,
                    key: googleMapsApiKey
                }
            }
        );
        return response.data;
    }

    public async estimate(req: Request, res: Response): Promise<void> {
        const { customer_id, origin, destination }: RideEstimateRequest =
            req.body;

        const validationError = this.validateRequest({
            customer_id,
            origin,
            destination
        });
        if (validationError) {
            const errorResponse = this.createErrorResponse(
                "INVALID_DATA",
                validationError
            );
            res.status(400).send(errorResponse);
            return;
        }

        try {
            const routeData = await this.fetchRoute(origin, destination);
            const { routes } = routeData;

            if (routes.length === 0) {
                throw new Error(
                    "Nenhuma rota encontrada entre os pontos fornecidos."
                );
            }

            const { legs } = routes[0];
            const { distance, duration, start_location, end_location } =
                legs[0];

            const availableDrivers = await this.getAvailableDrivers(
                distance.value
            );

            const responseBody: RideEstimateResponse = {
                origin: {
                    latitude: start_location.lat,
                    longitude: start_location.lng
                },
                destination: {
                    latitude: end_location.lat,
                    longitude: end_location.lng
                },
                distance: distance.value,
                duration: duration.text,
                options: availableDrivers,
                routeResponse: {
                    summary: routeData.routes[0].summary,
                    distance: distance.value,
                    duration: duration.text
                }
            };
            res.status(200).send(responseBody);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao buscar a rota:", error.message);
                const errorResponse = this.createErrorResponse(
                    "ROUTE_NOT_FOUND",
                    "Nenhuma rota encontrada entre os pontos fornecidos."
                );
                res.status(404).send(errorResponse);
            } else {
                console.error("Erro desconhecido:", error);
                const errorResponse = this.createErrorResponse(
                    "SERVER_ERROR",
                    "Erro interno ao processar a requisição."
                );
                res.status(500).send(errorResponse);
            }
        }
    }
}

export default RideController;
