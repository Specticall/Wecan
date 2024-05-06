import { useGoogleLogin } from "@react-oauth/google";
import Button from "../general/Button";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import { TGoogleLoginResponse, TUserLoginResponse } from "@/types/general";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
Custom wrapper button over the react oauth google npm package.
*/
export default function GoogleLoginButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { handleSuccessfulLogin } = useAuth();
  const { notify } = usePopup();

  // Gets called when the user successfuly logs in.
  const handleGoogleLogin = async (response: TGoogleLoginResponse) => {
    try {
      if (!response.credential)
        throw new Error(
          "Google credential / token was not found in google's response"
        );

      // Send the credential (code) to the backend ang recieve back user data with a  JWT token
      const res = await axios.get<TUserLoginResponse>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/auth/google?credential=${response.credential}`
      );

      const { token, userData } = res.data;

      handleSuccessfulLogin(userData, token);
    } catch (err) {
      if (!(err instanceof AxiosError)) return console.log(err);
      console.log({ ...err, stack: "" });
    }
  };

  // Hook to connects the google SDK with the application
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      handleGoogleLogin({
        credential: res.code,
      } as TGoogleLoginResponse);
      // handleGoogleLogin(res as TGoogleLoginResponse);
    },
    onError: () => {
      notify("Something went wrong while trying to log in");
    },
    // Uses auth-code flow (google has 2 main flows, impiclit and auth-code. The author of react oauth google recommends we use the auth-code flow if we have a seperate backend server)
    flow: "auth-code",
  });

  return (
    <Button
      variant="primary"
      className={cn(`relative [&&]:w-fit px-6 py-3 gap-0`, className)}
      onClick={(e) => {
        e.preventDefault();
        googleLogin();
      }}
      spinnerIconClass="ml-3"
    >
      <div className="[&>*]:invisible [&>*]:absolute google-login-wrapper"></div>
      <div className="flex gap-3 items-center justify-center [&>svg]:h-6 w-fit mx-auto">
        {children}
      </div>
    </Button>
  );
}
