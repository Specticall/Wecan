import { GoogleLogin } from "@react-oauth/google";
import Button from "../general/Button";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import { TGoogleLoginResponse, TUserLoginResponse } from "@/types/general";
import { useAuth } from "@/context/AuthContext";
import { usePopup } from "@/context/PopupContext";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function GoogleLoginButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { handleSuccessfulLogin } = useAuth();
  const { notify } = usePopup();

  const handleGoogleLogin = async (response: TGoogleLoginResponse) => {
    try {
      if (!response.credential)
        throw new Error(
          "Google credential / token was not found in google's response"
        );
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

  return (
    <Button
      variant="primary"
      className={cn(`relative !w-fit px-6 py-3 gap-0`, className)}
      onClick={(e) => e.preventDefault()}
      spinnerIconClass="ml-3"
    >
      <div className="[&>div]:!h-0 [&>div]:opacity-0 [&_iframe]:!w-0 inset-0 [&>div>div>:first-child]:hidden ">
        <GoogleLogin
          onSuccess={(res) => {
            handleGoogleLogin(res as TGoogleLoginResponse);
          }}
          onError={() => {
            notify("Something went wrong while trying to log in");
          }}
        />
      </div>
      <div className="[&>*]:invisible [&>*]:absolute google-login-wrapper"></div>
      <div className="flex gap-3 items-center justify-center [&>svg]:h-6 w-fit">
        {children}
      </div>
    </Button>
  );
}
