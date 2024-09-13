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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => {
  const [data, setResponse] = useState<Store>(RESPONSE_STATE);
  return (
    <>
      <ResponseStateContext.Provider value={{ data, setResponse }}>
        <NavBar />
        <main className="h-screen flex flex-col items-center">
          <div className="container max-w-screen-md m-auto">
            <Card className="flex flex-col items-center justify-center h-full gap-3 p-24 rounded-sm bg-accent-50/20 text--50 border-none">
              <CardHeader>
                <CardTitle className="text-3xl text-center font-bold tracking-tight leading-9">
                  Create Short URLs
                </CardTitle>
                <CardDescription className="text-[15px] font-normal text-center text-accent-500">
                  Link Shortener service to track, brand, and share short URLs.
                </CardDescription>
              </CardHeader>

              <UrlShortenForm />
              <ShortenedUrlDetails />
            </Card>
          </div>
        </main>
        <Toaster />
      </ResponseStateContext.Provider>
    </>
  );
};

export default HomePage;
