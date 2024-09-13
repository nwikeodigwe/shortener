import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { useContext } from "react";
import APIClient from "../../services/api-client";
import { AxiosError } from "axios";
import { produce } from "immer";
import { ResponseStateContext } from "../../context/UrlResponseContext";

interface UrlShortenFormProps {
  long_url: string;
}

const apiClient = new APIClient<UrlShortenFormProps>("urls/");

const UrlShortenForm = () => {
  const { setResponse } = useContext(ResponseStateContext);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UrlShortenFormProps>();

  const submitFn: SubmitHandler<UrlShortenFormProps> = async (data) => {
    data.long_url = data.long_url.trim();
    if (
      !data.long_url.startsWith("https://") &&
      !data.long_url.startsWith("http://")
    ) {
      data.long_url = `https://${data.long_url}`;
    }
    try {
      const res = await apiClient.post(data);
      console.log(res);
      setResponse(
        produce((draft) => {
          Object.assign(draft.response, res);
        })
      );
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errorResponse = err.response?.data as Record<string, string[]>;
        Object.entries(errorResponse).forEach(([field, messages]) => {
          setError(field as keyof UrlShortenFormProps, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        setError("long_url", {
          type: "server",
          message: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFn)} method="POST" className="w-full">
      <div className="grid grid-cols-12 gap-1">
        <div className="flex flex-col col-span-9 gap-2">
          <input
            disabled={isSubmitting}
            {...register("long_url", { required: "URL is required" })}
            type="text"
            className="w-full p-4 border-[1px] shadow-md border-gray-200 rounded-sm"
          />
          {errors.long_url && (
            <ErrorMessage>{errors.long_url.message?.toString()}</ErrorMessage>
          )}
        </div>
        <div className="col-span-3">
          <button
            type="submit"
            className="p-4 shadow-md w-full rounded-sm bg-green-700 text-white hover:bg-green-800"
            disabled={isSubmitting}
          >
            Shorten URL
          </button>
        </div>
      </div>
    </form>
  );
};

export default UrlShortenForm;
