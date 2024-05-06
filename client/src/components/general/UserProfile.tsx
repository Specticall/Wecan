import { useUser } from "@/context/UserContext";
import { TextField, TextFieldError, TextFieldLabel } from "./TextField";
import Button from "./Button";
import { DialogCollapse } from "@/context/GlobalDialogContext";
import useUserMutation from "@/hooks/useUserMutation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ScrollArea } from "../ui/scrollable";

export default function UserProfile() {
  const { userData } = useUser();
  const { updateMutation } = useUserMutation();
  const { handleLogout } = useAuth();

  // Once we start to add more setting fields we're going to transfer to react hook form
  const [username, setUsername] = useState(() => userData?.name || "");
  const [error, setError] = useState("");

  if (!userData) return;

  const handleSave = () => {
    if (!username || username.length <= 0) {
      setError("This field can't be empty");
      return;
    }

    setError("");
    updateMutation.mutate({ name: username });
  };

  return (
    <ScrollArea className="h-full 3xl:h-[calc(100vh-5rem)] overflow-hidden rounded-xl md:h-screen ">
      <article className="bg-white p-12 rounded-xl max-w-[45rem] pb-10 md:px-4 md:py-12 md:w-screen md:h-screen md:rounded-none">
        <div className="flex justify-between">
          <h2 className="text-dark font-semibold text-lg mb-1">Your Profile</h2>
          <DialogCollapse>
            <i className="bx bx-x text-lg text-light hover:text-dark cursor-pointer transition-all duration-200"></i>
          </DialogCollapse>
        </div>
        <p className="text-light border-b-[1px] border-slate-300 pb-6 mb-12">
          Manage your account profile and set preferences
        </p>
        <div className="grid grid-cols-[2fr_9fr] gap-16 gap-y-20 md:gap-0 md:flex-col md:flex">
          <div className="md:mb-6">
            <p className="text-dark mb-4 whitespace-nowrap">Profile Picture</p>
            <img
              src={userData.pictureURL}
              className="rounded-full md:w-16"
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
          <form className="md:mb-12">
            <TextField
              value={userData.email}
              disabled={true}
              className="mb-12 text-lighter md:mb-6"
            >
              <TextFieldLabel>
                Email
                <span className="text-lighter"> (Can't Change)</span>
              </TextFieldLabel>
            </TextField>
            <TextField
              defaultValue={userData.name}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            >
              <TextFieldLabel>Username</TextFieldLabel>
              {error && (
                <TextFieldError className="mt-4">{error}</TextFieldError>
              )}
              <p className="text-light mt-4">
                This is your public display name, by default we use the username
                you use on your google account.
              </p>
            </TextField>
          </form>
          <div className="grid grid-cols-[10rem_1fr_10rem] col-span-2 md:grid-cols-1 md:gap-2">
            <Button variant="tertiary" onClick={handleLogout}>
              Logout
            </Button>
            <div></div>
            <Button onClick={handleSave} isLoading={updateMutation.isLoading}>
              Save
            </Button>
          </div>
        </div>
      </article>{" "}
    </ScrollArea>
  );
}
