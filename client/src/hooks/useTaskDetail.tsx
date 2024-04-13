import { MouseEvent, useEffect, useState } from "react";
import useTaskMutation from "./useTaskMutation";
import { useGlobalDialog } from "@/context/GlobalDialogContext";
import { TTask } from "@/types/general";

/**
 * Logic for open tasks detail dialog
 * @param
 * @returns
 */
export default function useTaskDetail<T extends TTask>({ task }: { task?: T }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteMutation } = useTaskMutation();

  const { showDialog } = useGlobalDialog();

  const handleDelete = () => {
    if (!task?.id) return;
    deleteMutation.mutate(task.id);
    setIsDeleting(true);
  };

  const handleOpenDetailDialog = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    if ((e.target as HTMLDivElement).classList.contains("bx-trash")) return;
    showDialog("taskDetail", task);
  };

  useEffect(() => {
    if (deleteMutation.status === "error") setIsDeleting(false);
  }, [deleteMutation.status]);

  return { isDeleting, handleOpenDetailDialog, handleDelete };
}
