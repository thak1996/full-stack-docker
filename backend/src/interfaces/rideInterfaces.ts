import { RowDataPacket } from "mysql2";

export interface RideEstimateRequest {
    customer_id: string;
    origin: string;
    destination: string;
}

export interface DriverRow extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    value: number;
}

export type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    value: number;
};

export interface RideEstimateResponse {
    origin: {
        latitude: number;
        longitude: number;
    };
    destination: {
        latitude: number;
        longitude: number;
    };
    distance: number;
    duration: string;
    options: Driver[];
    routeResponse: object;
}

export interface RideEstimateErrorResponse {
    error_code: string;
    error_description: string;
}
