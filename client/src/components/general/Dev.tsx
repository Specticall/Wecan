import { useGlobalDialog } from "@/context/GlobalDialogContext";
import Button from "./Button";

export default function Dev() {
  const { closeDialog, showDialog } = useGlobalDialog();

  const performAnimation = async () => {
    await closeDialog({
      persistBackground: true,
    });
    showDialog("goalPrize");
  };

  return (
    <div className="bg-white p-8">
      <Button
        onClick={() => {
          performAnimation();
        }}
      >
        Click Me!
      </Button>
    </div>
  );
}
