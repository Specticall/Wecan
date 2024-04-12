import Button from "@/components/general/Button";
import { DialogCollapse, useGlobalDialog } from "@/context/GlobalDialogContext";
import sadPersonArt from "/assets/modal-art-sad.png";
import useUserMutation from "@/hooks/useUserMutation";

export default function TaskExpiredDialog() {
  const { contextData } = useGlobalDialog();
  const { updateMutation } = useUserMutation();

  if (!contextData) return;
  const expiredTaskCount =
    typeof contextData === "number" ? (contextData as number) : 0;

  const handleClose = () => {
    // Tell the server that the user has been notified of the expired tasks.
    updateMutation.mutate({ unannouncedExpiredTaskCount: 0 });
  };

  return (
    <article className="bg-white p-12 flex flex-col items-center justify-center rounded-md">
      <img src={sadPersonArt} className="max-w-[20rem] mb-8" />
      <p className="mb-2">Uh Oh!</p>
      <h2 className="text-lg text-center">
        {expiredTaskCount} Tasks Has Expired
      </h2>
      <p className="text-lighter max-w-[15rem] text-center mt-4">
        Looks like you forgot to complete your tasks yesterday
      </p>
      <DialogCollapse className="w-full mt-8">
        <Button
          variant="primary"
          className="shadow-none w-full"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogCollapse>
    </article>
  );
}
