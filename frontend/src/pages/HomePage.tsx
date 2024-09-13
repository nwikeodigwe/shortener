import { useState } from "react";
import NavBar from "../components/common/Navbar";
import ShortenedUrlDetails from "../components/common/ShortenedUrlDetails";
import UrlShortenForm from "../components/common/UrlShortenForm";
import { Toaster } from "@/components/ui/toaster";
import {
  ResponseStateContext,
  RESPONSE_STATE,
  Store,
} from "../context/UrlResponseContext";

const HomePage = () => {
  const [data, setResponse] = useState<Store>(RESPONSE_STATE);
  return (
    <>
      <ResponseStateContext.Provider value={{ data, setResponse }}>
        <NavBar />
        <main className="h-screen">
          <div className="container max-w-screen-md mx-auto flex flex-col items-center justify-center h-full gap-3">
            <h1 className="text-3xl text-gray-800 font-bold tracking-tight leading-9">
              Create Short URLs
            </h1>
            <p className="text-[15px] font-normal text-gray-700">
              Link Shortener service to track, brand, and share short URLs.
            </p>
            <UrlShortenForm />
            <ShortenedUrlDetails />
          </div>
        </main>
        <Toaster />
      </ResponseStateContext.Provider>
    </>
  );
};

export default HomePage;
