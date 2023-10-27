import { cookies } from 'next/headers';
import { queryKeys } from "@/constraints/queryKeys/queryKeys";
import axios from "axios";
import { useQuery } from "react-query";
import { endpoint } from '@/constraints/endpoints';

export default async function useProfile() {
    const token = cookies().get("token")?.value;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: endpoint.login,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    };
    const { isLoading, isError, data } = useQuery(queryKeys.profile, () => axios.request(config).then((res) => res.data));
    if (isLoading)
        return undefined;
    if (isError)
        return null;
    return data
}