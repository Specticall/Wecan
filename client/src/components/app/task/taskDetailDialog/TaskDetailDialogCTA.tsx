import Button from "@/components/general/Button";

export default function TaskDetailDialogCTA() {
  return (
    <div className="grid grid-cols-3 mt-12">
      <Button variant="tertiary" className="">
        Discard
      </Button>
      <div></div>
      <Button variant="primary" className="shadow-none">
        Complete
      </Button>
    </div>
  );
}
