import axios from "axios";

const Base_Url = "https://api.coingecko.com/api/v3";
const proxy = "https://corsproxy.io/?";

export const fetchCryptos = async () => {
  try {
    const url = `${Base_Url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const res = await axios.get(proxy + encodeURIComponent(url));
    return res.data;
  } catch (err) {
    console.error("Error fetching crypto:", err);
    return [];
  }
};
