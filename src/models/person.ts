import { Apartment } from "./apartment";

export interface Person {
    role: string;
    id: string;
    name: string;
    date_of_birth: Date;
    gender: string;
    front_identify_card_photo_URL: string;
    back_identify_card_photo_URL: string;
    phone_number: string;
    activated_at?: Date;
    email: string;
    deleted_at?: Date;
    stay_at_apartment_id?: string,
    stay_at?: Apartment
    created_at: Date;
  }