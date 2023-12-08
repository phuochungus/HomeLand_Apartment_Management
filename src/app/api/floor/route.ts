import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit");
  const page = request.nextUrl.searchParams.get("page");
  const response = await axios
    .get(endpoint.floor, {
      params: {
        limit,
        page
      }
    })
    .then((response) => {
      if (response.status == 200) {
        return NextResponse.json(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
      return NextResponse.json(error.response.data.message, {
        status: error.response.status,
        statusText: error.response.statusText,
      });
    });
  return response;
}
export async function POST(request: NextRequest) {
  const data = await request.formData();
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: endpoint.floor,
    headers: {
      "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
    },
    data: data,
  };
  console.log(endpoint.floor)
  const response = await axios
    .request(config)
    .then((response) => {
      console.log(response.status);
      if (response.status == 201) {
        return NextResponse.json(response.data);
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