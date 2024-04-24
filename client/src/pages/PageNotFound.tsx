import Button from "@/components/general/Button";
import personSadArt from "/assets/modal-art-sad.png";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { clearLocalStorage } from "@/lib/utils";

const DEFAULT_TITLE = "Something Went Wrong";
const DEFAULT_MESSAGE = "There was a problem, please try again later";

const errorMessages = [
  {
    indicator: "No route matches URL",
    title: "Page Not Found",
    message: "Looks like the page you're looking for does not exist",
  },
  {
    indicator: "Network Error",
    title: "There Was A Problem With Our Service",
    message:
      "Looks like our server is having issues at the moment. Please try again later.",
  },
  {
    indicator: "User data with the id of",
    title: "Something Went Wrong",
    message: "Failed to retrieve your account data. Please log in again",
  },
];

const matchError = (error: unknown) => {
  const errorData = {
    statusCode: 0 as number | undefined,
    title: DEFAULT_TITLE,
    message: DEFAULT_MESSAGE,
  };

  if (isRouteErrorResponse(error)) {
    const errorMessage = errorMessages.find((err) =>
      error.data.includes(err.indicator)
    );

    if (errorMessage) {
      errorData.title = errorMessage?.title;
      errorData.message = errorMessage?.message;
      errorData.statusCode = error.status;
    }
  }

  if (isAxiosError(error)) {
    // Search the response data, if not found the seach the message data
    const errorMessage =
      errorMessages.find((err) =>
        error.response?.data.message?.includes(err.indicator)
      ) || errorMessages.find((err) => error.message.includes(err.indicator));

    if (errorMessage) {
      errorData.title = errorMessage?.title;
      errorData.message = errorMessage?.message;
      errorData.statusCode = error?.status;
    }
  }

  return {
    statusCode: errorData?.statusCode || undefined,
    title: errorData?.title || DEFAULT_TITLE,
    message: errorData?.message || DEFAULT_MESSAGE,
  };
};

export default function PageNotFound() {
  const error = useRouteError();
  const navigate = useNavigate();

  const { statusCode, title, message } = matchError(error);

  useEffect(() => {
    // Clear the local storage if we fail to retrieve user data from the database so user can relog.
    if (message.includes("Failed to retrieve your account data.")) {
      clearLocalStorage("token", "id");
    }
  }, [message]);

  return (
    <main className="section flex items-center justify-center gap-36 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg text-dark mt-12 font-semibold">
          {statusCode || "Oh No!"}
        </p>
        <h1 className="text-dark text-xl font-semibold text-center">{title}</h1>
        <p className="text-light mt-4 text-center max-w-[27.5rem] leading-md">
          {message}
        </p>
        <Button className="mt-8" onClick={() => navigate("/home/landing")}>
          Go Back
        </Button>
      </div>
      <img src={personSadArt} alt="Sad Person" className="scale-[1]" />
    </main>
  );
}
