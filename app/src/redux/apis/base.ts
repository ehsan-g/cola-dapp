import axios from "axios";
import apiUrl from "../../env";

export const publicApi = axios.create({
  baseURL: apiUrl,
});
