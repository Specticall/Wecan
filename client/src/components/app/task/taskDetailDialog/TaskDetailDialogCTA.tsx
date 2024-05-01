import Button from "@/components/general/Button";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import useGoalMutation from "@/hooks/useGoalMutation";
import useTaskMutation from "@/hooks/useTaskMutation";
import { TUserTask } from "@/types/general";

export default function TaskDetailDialogCTA() {
  const { contextData, closeDialog, showDialog } = useGlobalDialog();
  const { completeTaskMutation, deleteMutation } = useTaskMutation();
  const { goalData } = useGoalMutation();

  if (!contextData) return;
  const userTaskData = contextData as TUserTask;

  const handleCompleteTask = () => {
    // Making use of closure's behavior to save the previous data.
    const oldUserPoints = goalData;

    completeTaskMutation.mutate(userTaskData.id, {
      onSuccess: (data) => {
        if (
          goalData &&
          userTaskData.points + goalData.earned >= goalData.target
        ) {
          showDialog("goalCompleted");
          return;
        }

        showDialog("taskComplete", {
          newUserGoal: data.data.data,
          oldUserGoal: oldUserPoints,
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
    <div className="grid grid-cols-3 mt-12 sm:grid-cols-1 sm:gap-2">
      <Button
        variant="tertiary"
        className="flex items-center justify-center gap-2 sm:py-4"
        onClick={handleDiscardTask}
        disabled={deleteMutation.isLoading || completeTaskMutation.isLoading}
        isLoading={deleteMutation.isLoading}
      >
        Discard
      </Button>
      <div></div>
      <Button
        variant="primary"
        className="shadow-none flex items-center justify-center gap-2 sm:py-4"
        onClick={handleCompleteTask}
        disabled={completeTaskMutation.isLoading || deleteMutation.isLoading}
        isLoading={completeTaskMutation.isLoading}
      >
        Complete
      </Button>
    </div>
  );
}
