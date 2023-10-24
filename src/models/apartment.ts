import { json } from "stream/consumers";

export class Apartment{
    apartment_id!: string ;
    name!:string;
    address!:string;
    images!:string[];
    bedroom!:number;
    bathRooms!:number;
    width!:number;
    length!:number;
    squareStatus!:string;  
}
