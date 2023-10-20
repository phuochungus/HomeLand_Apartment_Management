import axios from "axios";
import { cookies } from "next/headers";
import { endpoint } from "@/constraints/endpoints";
export async function validateToken(token:string | undefined):Promise<boolean> {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: endpoint.login,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    };

    return await axios.request(config)
    .then(res => true)
    .catch(err => false)
}