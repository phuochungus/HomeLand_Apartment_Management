import { endpoint } from "@/constraints/endpoints";
import { Resident } from "@/models/resident";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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
            const result: Resident[] = []
            response.data.forEach((element: any) => {
                const temp = {
                    id: element.id,
                    profile: element.profile as Profile
                } as Resident
                result.push(temp)
            });
            return NextResponse.json(result, {
                status: 200,
            });
        }
    }).catch((error) => {
        console.log(error);
        return NextResponse.json(error.response.data.message, { status: error.response.status, statusText: error.response.statusText })
    })
    return response;
}