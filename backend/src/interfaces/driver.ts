import { RowDataPacket } from "mysql2";

export interface Driver extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    car: string;
    avaliation: number;
    km_tax: number;
}
