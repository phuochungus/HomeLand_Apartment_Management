import axios from 'axios';
import { NextResponse } from 'next/server';
import { endpoint } from '@/constraints/endpoints';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    cookies().delete("token")
    return NextResponse.json("Success", {
        status: 200,
    });
}