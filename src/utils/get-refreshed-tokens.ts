import axios from "axios";
import { BASE_API_URL } from "../config";

export default async function getRefreshedTokens() {
  const apiUrl = `${BASE_API_URL}/auth/token`;

  await axios.get(apiUrl);
}
