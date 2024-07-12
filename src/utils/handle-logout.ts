import axios from "axios";
import { BASE_API_URL } from "../config";

export default async function handleLogout() {
  const apiUrl = `${BASE_API_URL}/users/logout`;

  axios.get(apiUrl).then(() => {
    window.location.href = "/";
  });
}
