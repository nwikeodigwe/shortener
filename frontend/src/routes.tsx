import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UrlRedirect from "./pages/UrlRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:url_code",
    element: <UrlRedirect />,
  },
]);

export default router;
