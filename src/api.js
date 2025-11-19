import axios from "axios";

// your render backend URL
const API = "https://app-cloner-backend-clean.onrender.com/api/clone";

export async function startClone(url, maxPages = 3) {
  const res = await axios.post(API, { url, maxPages }, { timeout: 180000 });
  return res.data;
}
