import Button from "@/components/general/Button";
import Icons from "@/components/general/Icon";
import {
  PasswordField,
  PasswordFieldError,
  PasswordFieldLabel,
} from "@/components/general/PasswordField";
import {
  TextField,
  TextFieldError,
  TextFieldLabel,
} from "@/components/general/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import waveImage from "/assets/wave-login.png";
import { GoogleLogin } from "@react-oauth/google";
import { TGoogleLoginResponse } from "@/types/general";
import axios from "axios";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";

type TLoginValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TLoginValues> = (value) => {
    console.log(value);
  };

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
    <main className="relative gap-12 py-16">
      <img
        src={waveImage}
        className="absolute bottom-0 z-[-1] left-0 right-0 w-full"
      />
      <div className="w-full">
        <p
          onClick={() => navigate("/home/landing")}
          className="flex gap-3 items-center justify-start text-light hover:text-lighter cursor-pointer px-16 self-start mb-8"
        >
          <i className="bx bx-arrow-back"></i>
          Back
        </p>
      </div>
      <div className=" min-h-screen flex flex-col items-center justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full  max-w-[35rem] bg-white shadow-xl p-12 rounded-xl "
        >
          <h1 className="text-lg font-semibold">Login</h1>
          <p className="text-lighter mt-2">
            Don't have an account?{" "}
            <span
              className="text-accent underline cursor-pointer hover:opacity-70"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign Up
            </span>
          </p>
          <div className="grid mt-10">
            {/* === EMAIL === */}
            <TextField
              {...register("email", { required: "Field can't be empty" })}
              placeholder="jackmrtn@example.com"
              onErrorClassName={{ container: "mb-0" }}
              containerClassName="mb-6"
            >
              <TextFieldLabel>Email Address</TextFieldLabel>
              <TextFieldError>{errors.email?.message}</TextFieldError>
            </TextField>

            {/* === PASSWORD === */}
            <PasswordField
              {...register("password", { required: "Field can't be empty" })}
              placeholder="********"
              onErrorClassName={{ container: "mb-6" }}
              containerClassName="mb-12"
            >
              <PasswordFieldLabel>Password</PasswordFieldLabel>
              <PasswordFieldError>
                {errors.password?.message}
              </PasswordFieldError>
            </PasswordField>

            <div className="grid grid-cols-1">
              <Button variant="dark" className="mb-4">
                Sign Up
              </Button>
              <GoogleLogin
                onSuccess={(res) =>
                  handleGoogleLogin(res as TGoogleLoginResponse)
                }
                onError={() => console.log("Something went wrong")}
              />
              <Button variant="transparent" className="relative">
                <div className="flex gap-3 items-center justify-center [&>svg]:h-6 ">
                  <Icons icon="googleIcon" />
                  <p>Sign in with Google</p>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
