import axios from "axios";
import { endpoint } from "@/constraints/endpoints";
export async function validateToken(token: string | undefined): Promise<boolean> {
    if(!token)
        return false;
    const result = await fetch(endpoint.tokenValidate, {
        method: "get", headers: {
            'Authorization': 'Bearer ' + token,
            'accept': "application/json",
            'Content-Type': 'application/json'
        },
    })
    .then(res => true)
    .catch(err => { console.log(err); return false })
    return result;
}