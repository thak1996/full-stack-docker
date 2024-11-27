export interface RideEstimateRequest {
    customer_id: string;
    origin: string;
    destination: string;
}

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
    options: Array<Driver>;
    routeResponse: object;
}

export interface RideEstimateErrorResponse {
    error_code: string;
    error_description: string;
}

export interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    km_tax: string;
}
