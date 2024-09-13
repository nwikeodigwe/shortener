import axios from "axios";

const getIpInfo = async () => {
  try {
    const res = await axios.get("https://ipapi.co/json/");
    return res.data;
  } catch (err) {
    console.error("Error fetching IP info:", err);
    return null;
  }
};

export default getIpInfo;
