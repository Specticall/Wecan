import { GoogleLogin } from "@react-oauth/google";
import Button from "../general/Button";
import Icons from "../general/Icon";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios, { AxiosError } from "axios";
import { TGoogleLoginResponse, TUserLoginResponse } from "@/types/general";
import { useAuth } from "@/context/AuthContext";

export default function GoogleLoginButton() {
  const { handleSuccessfulLogin } = useAuth();

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
      variant="transparent"
      className="relative"
      onClick={(e) => e.preventDefault()}
    >
      <div className="[&>div]:!h-0 [&>div]:opacity-0 inset-0">
        <GoogleLogin
          onSuccess={(res) => handleGoogleLogin(res as TGoogleLoginResponse)}
          onError={() => console.log("Something went wrong")}
        />
      </div>
      <div className="[&>*]:invisible [&>*]:absolute google-login-wrapper"></div>
      <div className="flex gap-3 items-center justify-center [&>svg]:h-6 ">
        <Icons icon="googleIcon" />
        <p>Sign in with Google</p>
      </div>
    </Button>
  );
}
