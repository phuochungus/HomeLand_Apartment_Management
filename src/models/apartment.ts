

import { json } from "stream/consumers";

// export class Apartment{
//     apartment_id!: string ;
//     name!:string;
//     address!:string;
//     images!:string[];
//     bedroom!:number;
//     bathRooms!:number;
//     width!:number;
//     length!:number;
//     squareStatus!:string; 
    
// }

// export interface Apartment {
//     apartment_id: string,
//     building_id: string,
//     created_at: Date,
//     deleted_at?: Date,
//     description: string,
//     floor_id: string,
//     imageURLs: Array<string>,
//     length: number,
//     name: string,
//     number_of_bathroom: number,
//     number_of_bedroom: number,
//     rent: string,
//     status: string,
//     width: number
  

// }


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
}

