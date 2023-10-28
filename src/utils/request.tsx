import axios from "axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFETTE2OTgzOTY3MTg0NzkiLCJpYXQiOjE2OTgzOTcyMjcsImV4cCI6MTcwMDk4OTIyN30.Sm7L37MvcGwrFISxVUKrX9QSyWDk09xEoN7MiznOcko"
export const request = axios.create({
    baseURL: 'http://localhost:5000/',
    headers:  { Authorization: `Bearer ${token}` }
})