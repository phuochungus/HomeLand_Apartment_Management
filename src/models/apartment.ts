import { Resident } from "./resident";
import { Floor } from "./floor";
export type Apartment = {
    apartment_id: string ;
    name: string;
    rent: string;
    images:string[];
    bedroom:number;
    bathroom:number;
    width:number;
    length:number;
    status:string; 
    description: string;
    floorId: string;
    buildingId: string;
    residents?: Array<Resident>;
    floor?: Floor;
    
}
