import { useGlobalDialog } from "@/context/GlobalDialogContext";
import MoodSelector from "../app/moodModal/MoodSelector";
import Button from "./Button";
import { useUser } from "@/context/UserContext";
import useUserMutation from "@/hooks/useUserMutation";
import LoadingSpinner from "./loadingSpinner";

export default function NewDayDialog() {
  const { userData } = useUser();
  const { closeDialog } = useGlobalDialog();
  const { updateMutation } = useUserMutation();

  return (
    <article className="bg-white p-12 max-w-[50rem] rounded-xl flex flex-col items-center justify-center">
      <h1 className="text-[1.75rem] font-semibold mb-2">Welcome Back!</h1>
      <p className="text-center text-light leading-md mb-6 max-w-[22.5rem]">
        Looks like it’s your first time logging in today. Tell us how you’re
        feeling!
      </p>
      <div className="flex flex-col gap-4 items-center justify-center  mb-8">
        <MoodSelector
          variant="clean"
          className="w-full shadow-none border-border border-[1px] mt-4 gap-16"
        />
        <p className="text-lighter">*Select your mood before proceeding</p>
      </div>

      <Button
        className="w-full max-w-[10rem] mt-6 disabled:grayscale flex items-center justify-center gap-2"
        disabled={userData?.mood === "Unknown"}
        onClick={() => {
          updateMutation.mutate(
            { hasSetMoodToday: true },
            // Only close the modal if the last login data has been successfuly updated.
            {
              onSuccess: () => {
                closeDialog();
              },
            }
          );
        }}
      >
        Done {updateMutation.isLoading ? <LoadingSpinner /> : ""}
      </Button>
    </article>
  );
}
