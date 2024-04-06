import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import Button from "../general/Button";
import Icons from "../general/Icon";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import axios from "axios";
import { TGoogleLoginResponse } from "@/types/general";

export default function GoogleLoginButton() {
  const handleGoogleLogin = async (response: TGoogleLoginResponse) => {
    try {
      const res = await axios.get(
        `${BASE_URL}${BASE_ENDPOINT}/v1/auth/google?credential=${response.credential}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
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
