import Button from "@/components/general/Button";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { useUser } from "@/context/UserContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogCTA() {
  const { contextData, closeDialog, showDialog } = useGlobalDialog();
  const { completeTaskMutation, deleteMutation } = useTaskMutation();
  const { userData } = useUser();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  const handleCompleteTask = () => {
    // Making use of closure's behavior to save the previous data.
    const oldUserPoints = userData?.point;

    completeTaskMutation.mutate(userTaskData.id, {
      onSuccess: (data) => {
        showDialog("taskComplete", {
          newData: data.data.data,
          oldData: oldUserPoints,
        });
      },
    });
  };

  const handleDiscardTask = () => {
    deleteMutation.mutate(userTaskData.id, {
      onSuccess: () => closeDialog(),
    });
  };
  return (
    <div className="grid grid-cols-3 mt-12">
      <Button
        variant="tertiary"
        className="flex items-center justify-center gap-2"
        onClick={handleDiscardTask}
        disabled={deleteMutation.isLoading}
      >
        Discard
        {deleteMutation.isLoading && <LoadingSpinner />}
      </Button>
      <div></div>
      <Button
        variant="primary"
        className="shadow-none flex items-center justify-center gap-2"
        onClick={handleCompleteTask}
        disabled={completeTaskMutation.isLoading}
      >
        Complete
        {completeTaskMutation.isLoading && <LoadingSpinner color="white" />}
      </Button>
    </div>
  );
}
