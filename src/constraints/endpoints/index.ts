//const baseUrl = "https://homeland-be.onrender.com";
const baseUrl = "http://localhost:3000";

export const endpoint = {
  login: baseUrl + "/auth/signin",
  profile: baseUrl + "/me",
  tokenValidate: baseUrl + "/token/validate",
  resident: baseUrl + "/resident",
  manager: baseUrl + "/manager",
  technician: baseUrl + "/technician",
  apartment: baseUrl + "/apartment",
  person: baseUrl + "/person",
  me: baseUrl + "/me",
  building: baseUrl + "/building",
  contract: baseUrl + "/contract",
  service: baseUrl + "/service",
  servicePackage: baseUrl + "/service-package",
};
