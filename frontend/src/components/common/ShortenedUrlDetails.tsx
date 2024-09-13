import { useContext } from "react";
import { ResponseStateContext } from "../../context/UrlResponseContext";
import { FaCopy } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
      <div className="shadow-md bg-blue-100 p-4 rounded-md w-full mt-3">
        <div className="flex justify-between items-center">
          <h2 className="flex gap-1 items-center text-sm font-semibold text-blue-900">
            {linkToCopy}
            <FaCopy
              className="text-blue-500 ml-2 cursor-pointer hover:scale-105 transition duration-100"
              onClick={copyToClipboard}
            />
          </h2>
          <div className="flex gap-2">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Edit url
            </Button>
            <Button onClick={copyToClipboard}>Copy url</Button>
          </div>
        </div>
        <div>
          <p className="flex items-center gap-1 text">
            <TbWorld />
            <span className="text-sm font-thin">{data.response.long_url}</span>
          </p>
        </div>
      </div>
    )
  );
};

export default ShortenedUrlDetails;
