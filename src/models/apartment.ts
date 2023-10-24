export interface Apartment {
  apartment_id: string | null;
  name: string | null;
  address: string | null;
  images: string[] | null;
  bedroom: number | null;
  bathRooms: number | null;
  width: number | null;
  length: number | null;
  squareStatus: string | null;
}
