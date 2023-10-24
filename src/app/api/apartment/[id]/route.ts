import { endpoint } from "@/constraints/endpoints";
import { Apartment } from "@/models/apartment";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.apartment + "/" + id,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .request(config)
    .then((response) => {
      if (response.status == 200) {
        const temp = {
          apartment_id: response.data.apartment_id,
          width: response.data.width,
          length: response.data.length,
          name: response.data.name,
          rent: response.data.rent,
          bathRooms: response.data.number_of_bedroom,
          bedroom: response.data.number_of_bedroom,
          images: response.data.imageURLs,
          status: response.data.status,
          description: response.data.description,
          floorId: response.data.floor_id,
          buildingId: response.data.building_id,
        } as Apartment;
        const result: Apartment = temp;

        return NextResponse.json(result, {
          status: 200,
        });
      }
    })
    .catch((error) => {
      return NextResponse.json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
  return response;
}
