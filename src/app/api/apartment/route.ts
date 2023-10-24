import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { endpoint } from '@/constraints/endpoints';
import { cookies } from 'next/headers';
import { Apartment } from '@/models/apartment';

export async function POST(request: NextRequest) {
  let body = await request.json()
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint.login,
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
      'Content-Type': 'application/json',
    },
    data: body
  };
  const response = await axios.request(config).then((response) => {
    if (response.status == 201) {
      cookies().set("token", response.data)
      return NextResponse.json(response.data.role, {
        status: 200,
        headers: { 'Set-Cookie': `token=${response.data.access_token}` },
      });
    }

  }).catch((error) => { console.log(error); return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText }) })
  return response;
}
export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page")
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: endpoint.apartment + (page != null ? "?page=" + page : ""),
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.request(config).then((response) => {
    if (response.status == 200) {
      const result: Apartment[] = []
      response.data.forEach((element: any) => {
        const temp = {
          apartment_id: element.apartment_id,
          width: element.width,
          length: element.length,
          name: element.name,
          rent: element.rent,
          bathRooms: element.number_of_bedroom,
          bedroom: element.number_of_bedroom,
          images: element.imageURLs,
          status: element.status,
          description: element.description,
          floorId: element.floor_id,
          buildingId: element.building_id
        } as Apartment
        result.push(temp)
      });
      return NextResponse.json(result, {
        status: 200,
      });
    }
  }).catch((error) => {
    return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })
  })
  return response;
}