import { Building } from "./building";

export interface Floor {
        floor_id: string,
        building_id: string,
        name: string,
        max_apartment: number,
        building?: Array<Building>
}