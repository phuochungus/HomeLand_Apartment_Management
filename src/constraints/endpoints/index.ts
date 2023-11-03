import { BaseNextRequest } from "next/dist/server/base-http"

const baseUrl = "https://homeland-be.onrender.com"
export const endpoint = {
    login: baseUrl + "/auth/signin",
    profile: baseUrl + "/me",
    tokenValidate: baseUrl + "/token/validate",
    apartment: baseUrl + "/apartment",
    employee: baseUrl + "/employee",
    person: baseUrl + "/person",
    me: baseUrl + "/me"
}