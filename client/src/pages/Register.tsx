import Button from "@/components/general/Button";
import Checkbox from "@/components/general/Checkbox";
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

type TRegisterValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// No longer used in favor of Google OAuth. However might be used in the future.
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TRegisterValues> = (value) => {
    console.log(value);
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
          <h1 className="text-lg font-semibold">Create an Account</h1>
          <p className="text-lighter mt-2">
            Already have an account?{" "}
            <span
              className="text-accent underline cursor-pointer hover:opacity-70"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
          <div className="grid mt-10">
            {/* === USERNAME === */}
            <TextField
              {...register("username", { required: "Field can't be empty" })}
              placeholder="Jack Marteen"
              onErrorClassName={{ container: "mb-0" }}
              containerClassName="mb-6"
            >
              <TextFieldLabel>Name</TextFieldLabel>
              <TextFieldError>{errors.username?.message}</TextFieldError>
            </TextField>
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
              onErrorClassName={{ container: "mb-0" }}
              containerClassName="mb-6"
            >
              <PasswordFieldLabel>Password</PasswordFieldLabel>
              <PasswordFieldError>
                {errors.password?.message}
              </PasswordFieldError>
            </PasswordField>
            {/* === CONFIRM PASSWORD === */}
            <PasswordField
              {...register("confirmPassword", {
                required: "Field can't be empty",
              })}
              placeholder="********"
              containerClassName="mb-12"
            >
              <PasswordFieldLabel>Confirm Password</PasswordFieldLabel>
              <div className="flex items-center justify-between mt-3">
                <p className="text-[0.75rem]">Atleast Contains 8 Characters</p>
                <PasswordFieldError className="mt-0">
                  {errors.confirmPassword?.message}
                </PasswordFieldError>
              </div>
            </PasswordField>
            <div className="flex gap-4 items-start justify-center">
              <Checkbox size="sm" className="mt-1" />
              <p className="text-light mb-12 leading-6">
                By creating an account, you are acknowledging and consenting to
                our{" "}
                <span className="text-accent underline cursor-pointer hover:opacity-60 ">
                  Terms of Service
                </span>
              </p>
            </div>
            <Button>Sign Up</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
