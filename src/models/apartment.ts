import { Resident } from "./resident";

export type Apartment = {
    apartment_id: string ;
    name:string;
    rent: string;
    address:string;
    images:string[];
    bedroom:number;
    bathRooms:number;
    width:number;
    length:number;
    status:string; 
    description: string;
    floorId: string;
    buildingId: string;
    residents?: Array<Resident>
}
