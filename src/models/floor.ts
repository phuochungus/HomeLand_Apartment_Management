import { Apartment } from "./apartment";

export interface Floor {
        floor_id: string,
        building_id: string,
        name: string,
        max_apartment: number,
        apartments?: Array<Apartment>
}