import { Resident } from "./resident";

export interface Vehicle {
    id: String,
    status: String,
    licensePlate: String,
    frontRegistrationPhotoURL: String,
    backRegistrationPhotoURL: String,
    licensePlatePhotoURL: String,
    resident: Resident
  }