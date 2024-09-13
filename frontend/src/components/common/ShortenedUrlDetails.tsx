import { useContext } from "react";
import { ResponseStateContext } from "../../context/UrlResponseContext";
import { FaCopy } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ShortenedUrlDetails = () => {
  const { toast } = useToast();
  const { data } = useContext(ResponseStateContext);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.REACT_APP_BASE_URL}${data.response.url_code}`
    );
    toast({
      title: "Link copied successfully",
      description: `${linkToCopy} has been copied to your clipboard.`,
    });
  };
  const linkToCopy = `${import.meta.env.REACT_APP_BASE_URL}${
    data.response.url_code
  }`;
  return (
    data.response.url_code && (
      <Card className="shadow-md rounded-sm bg-blue-100/10 border-none w-full mt-3">
        <CardHeader className="flex flex-row items-end justify-between">
          <div>
            <CardTitle className="flex gap-1 items-center text-sm font-semibold text-blue-900">
              {linkToCopy}
              <FaCopy
                className="text-blue-500 ml-2 cursor-pointer hover:scale-105 transition duration-100"
                onClick={copyToClipboard}
              />
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text">
              <TbWorld />
              <span className="text-sm font-thin">
                {data.response.long_url}
              </span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600 font-semibold">
              Edit url
            </Button>
            <Button onClick={copyToClipboard} className="font-semibold">
              Copy url
            </Button>
          </div>
        </CardHeader>
      </Card>
    )
  );
};

export default ShortenedUrlDetails;
