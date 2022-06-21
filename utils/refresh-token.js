import axios from "axios";
import { ENDPOINT } from "consts";

export default async function refreshToken(callback) {
  const res = await axios.post(`${ENDPOINT}/auth/refresh-tokens`, {
    refreshToken: window.localStorage.getItem("refresh-token"),
  });
  if (res?.data?.access) {
    window.localStorage.setItem("token", res.data.access.token);
    window.localStorage.setItem("refresh-token", res.data.refresh.token);
    callback();
  }
}
