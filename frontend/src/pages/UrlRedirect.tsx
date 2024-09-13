import { useParams } from "react-router-dom";
import APIClient from "../services/api-client";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { Response } from "../context/UrlResponseContext";
import getBrowserClient from "@/functions/getBrowserClient";
import getIpInfo from "@/functions/getIpInfo";

const apiClient = new APIClient("urls/");

const UrlRedirect = () => {
  const [invalidRedirect, setValidRedirect] = useState(false);
  const [data, setData] = useState({ payload: {}, browser_client: {} });
  const { url_code } = useParams();

  useEffect(() => {
    const RedirectUrl = async () => {
      const ip = await getIpInfo();
      const browser = await getBrowserClient();
      setData({
        payload: ip,
        browser_client: browser,
      });

      try {
        const res = (await apiClient.get(`${url_code}/`)) as Response;
        if (res.long_url) {
          const create = await apiClient.post(data, `${url_code}/visits/`);
          console.log(create);
          window.location.href = res.long_url;
        } else {
          setValidRedirect(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    RedirectUrl();
  }, [data, url_code]);

  return <>{invalidRedirect && <HomePage />}</>;
};

export default UrlRedirect;
