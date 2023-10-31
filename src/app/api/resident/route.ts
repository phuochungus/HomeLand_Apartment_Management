import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { endpoint } from '@/constraints/endpoints';
import { cookies } from 'next/headers';
export async function GET(request: NextRequest) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: endpoint.resident,
    headers: {
      'Authorization': "Bearer " + request.cookies.get("token")?.value,
      'Content-Type': 'application/json',
  },
  };  
 
  const response = await axios.request(config).then((response) => {
    if (response.status == 200) {
      // cookies().set("token", response.data)
      // console.log(response.data)
      return NextResponse.json(response.data
      //   , {
      //   status: 200,
      //   headers: { 'Set-Cookie': `token=${response.data.access_token}` },
      // }
      );
    }
  }).catch((error) =>{
    console.log(error)
    return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })})
  return response;
}
export async function POST(request: NextRequest) {  
 
  const data = await request.formData();
  
    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: endpoint.resident,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
   data: data
  };   

  const response = await axios.request(config).then((response) => {
    console.log(response.status)
    if (response.status == 201) {
    
     // console.log(body)
      //cookies().set("token", response.data)
      return NextResponse.json(response.data
      //   , {
      //   status: 200,
      //   headers: { 'Set-Cookie': `token=${response.data.access_token}` },
      // }
      );
    }
  }).catch((error) =>{return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })})
  return response;
  
  
  
  
}