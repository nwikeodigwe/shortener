import { createContext } from "react";

export interface Response {
  created_at: string;
  expiration: string;
  id: number;
  long_url: string;
  status: string;
  url_code: string;
  visit_count: number;
}

export interface Popup {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "info";
  header: string;
}

export interface Store {
  response: Response;
  popup: Popup;
}

// Initial state
export const RESPONSE_STATE: Store = {
  response: {
    created_at: "",
    expiration: "",
    id: 0,
    long_url: "",
    status: "",
    url_code: "",
    visit_count: 0,
  },
  popup: {
    isOpen: false,
    message: "",
    type: "success",
    header: "",
  },
};

// Context definition
interface ResponseStateContextProps {
  data: Store;
  setResponse: React.Dispatch<React.SetStateAction<Store>>;
}

export const ResponseStateContext = createContext<ResponseStateContextProps>({
  data: RESPONSE_STATE,
  setResponse: () => {},
});
