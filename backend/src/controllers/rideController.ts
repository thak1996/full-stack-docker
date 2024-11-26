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
        const [results]: [DriverRow[], any] = await pool.query<DriverRow[]>(
            "SELECT * FROM drivers WHERE km_tax <= ?",
            [distance / 1000]
        );

        return results
            .map((driver) => ({
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                    rating: driver.avaliation,
                    comment: driver.comment
                },
                value: (distance / 1000) * driver.value
            }))
            .sort((a, b) => a.value - b.value);
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
        console.log("Fetching route...");
        const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
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
        console.log("Route fetched:", response.data);
        return response.data;
    }

    public async estimate(req: Request, res: Response): Promise<void> {
        console.log("Received estimate request:", req.body);

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
                routeResponse: routes[0]
            };

            console.log("Sending response:", responseBody);
            res.status(200).send(responseBody);
        } catch (error) {
            console.error(error);
            const errorResponse = this.createErrorResponse(
                "SERVER_ERROR",
                "Erro ao calcular a rota ou buscar motoristas."
            );
            res.status(500).send(errorResponse);
        }
    }
}

export default RideController;
