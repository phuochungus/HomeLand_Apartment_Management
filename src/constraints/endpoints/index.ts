const baseUrl = "https://homeland-be.onrender.com"
// const baseUrl = "http://localhost:5000"
export const endpoint = {
    login: baseUrl + "/auth/signin",
    profile: baseUrl + "/me",
    tokenValidate: baseUrl + "/token/validate",

    resident: baseUrl + "/resident",

    apartment: baseUrl + "/apartment",
    person: baseUrl + "/person"

}