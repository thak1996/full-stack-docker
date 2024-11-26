export interface GoogleMapsResponse {
    routes: Array<{
        legs: Array<{
            distance: {
                value: number;
                text: string;
            };
            duration: {
                value: number;
                text: string;
            };
            start_location: {
                lat: number;
                lng: number;
            };
            end_location: {
                lat: number;
                lng: number;
            };
        }>;
    }>;
}
