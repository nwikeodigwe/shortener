import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/common/Navbar";

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <div>
        <h1>Opps</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "Its seems like like an unexpected error occured"}
        </p>
      </div>
    </>
  );
};
