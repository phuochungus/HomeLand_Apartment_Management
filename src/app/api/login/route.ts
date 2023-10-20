import { cookies, headers } from 'next/headers';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { LoginEndpoint } from '@/constraints/endpoints/login';

export async function POST(request: Request) {
  let body = await request.json()

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: LoginEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body
  };

  const response = await axios.request(config).then((response) => {
    if (response.status == 201) {
      return NextResponse.json(response.data.role, {
        status: 200,
        headers: { 'Set-Cookie': `token=${response.data.access_token}` },
      });
    }

  }).catch((error) =>{ console.log(error); return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })})
  return response;
}