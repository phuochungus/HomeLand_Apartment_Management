import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { endpoint } from "@/constraints/endpoints";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: endpoint.resident,
    headers: {
      Authorization: "Bearer " + request.cookies.get("token")?.value,
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .request(config)
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
    url: endpoint.resident,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  const response = await axios
    .request(config)
    .then((response) => {
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

  // export async function GET(request: NextRequest) {
  //     let config = {
  //         method: 'get',
  //         maxBodyLength: Infinity,
  //         url: endpoint.person,
  //         headers: {
  //             'Authorization': "Bearer " + request.cookies.get("token")?.value,
  //             'Content-Type': 'application/json',
  //         },
  //     };
  //     const response = await axios.request(config).then((response) => {
  //         if (response.status == 200) {
  //             const result: Person[] = []
  //             response.data.forEach((element: any) => {
  //                 const temp = {
  //                     id: element.id,
  //                     avatar: element.avatarURL,
  //                     name: element.name,
  //                     role: element.role,
  //                     gender: element.gender,
  //                     dateOfBirth: element.date_of_birth,
  //                     phoneNumber: element.phone_number,
  //                     activatedAt: element.activated_at
  //                 } as Person
  //                 result.push(temp)
  //             });
  //             return NextResponse.json(result, {
  //                 status: 200,
  //             });
  //         }
  //     }).catch((error) => {
  //         console.log(error);
  //         return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })
  //     })
  //     return response;
}
