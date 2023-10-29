import axios from "axios";
//api to send form data to server

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export function login(data:FormData) {
  console.log("api url",apiUrl);
  return axios.post(apiUrl + "/login/", data);
}