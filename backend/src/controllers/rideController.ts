import { Request, Response } from "express";
import { pool } from "../database";
import { Driver } from "../interfaces/driver";
import { GoogleMapsResponse } from "../interfaces/googleMaps";
import axios from "axios";

class RideController {
    public async estimate(req: Request, res: Response): Promise<void> {
        const { origem, destino, userId } = req.body;
        if (!origem || !destino) {
            res.status(400).send({
                error: "Origem e Destino não podem estar em branco."
            });
            return;
        }
        if (!userId) {
            res.status(400).send({
                error: "O ID do usuário não pode estar em branco."
            });
            return;
        }
        if (origem === destino) {
            res.status(400).send({
                error: "Origem e Destino não podem ser iguais."
            });
            return;
        }
        try {
            const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
            const response = await axios.get<GoogleMapsResponse>(
                `https://maps.googleapis.com/maps/api/directions/json`,
                {
                    params: {
                        origin: origem,
                        destination: destino,
                        key: googleMapsApiKey
                    }
                }
            );

            const route = response.data.routes[0];
            const leg = route.legs[0];
            const distance = leg.distance.value;
            const duration = leg.duration.text;
            const startLocation = leg.start_location;
            const endLocation = leg.end_location;

            const [results]: [Driver[], any] = await pool.query<Driver[]>(
                "SELECT * FROM drivers WHERE km_tax <= ?",
                [distance / 1000]
            );
            const availableDrivers = results
                .map((driver) => ({
                    id: driver.id,
                    name: driver.name,
                    description: driver.description,
                    car: driver.car,
                    rating: driver.avaliation,
                    totalCost: (distance / 1000) * driver.km_tax
                }))
                .sort((a, b) => a.totalCost - b.totalCost);

            res.send({
                startLocation: {
                    lat: startLocation.lat,
                    lng: startLocation.lng
                },
                endLocation: {
                    lat: endLocation.lat,
                    lng: endLocation.lng
                },
                distance: distance,
                duration: duration,
                availableDrivers: availableDrivers,
                googleResponse: route
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error: "Erro ao calcular a rota ou buscar motoristas."
            });
        }
    }
}

export default RideController;
