import axios from "axios";
//api to send form data to server

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export function login(data:FormData) {
  console.log("api url",apiUrl);
  return axios.post(apiUrl + "/login/", data);
}

export function crimeQuery(data:FormData) {
  return axios.post(apiUrl + "/crimequery/", data);
}

export function totalTuples(){
  return axios.post(apiUrl + "/totaltuples/");
}

export function hospitalQuery(data:FormData) {
  return axios.post(apiUrl + "/hospitalquery/", data);
}

export function lossWorkQuery(data:FormData) {
  return axios.post(apiUrl + "/worklossquery/", data);
}

export function prisonCollegeQuery(data:FormData) {
  return axios.post(apiUrl + "/prisoncollegequery/", data);
}

export function vaccDiagQuery(data:FormData) {
  return axios.post(apiUrl + "/vaccdiagquery/", data);
}