import { useState, useEffect } from "react";
import { EditTaskModalProps, Task } from "./types";

export const useEditTaskController = (
  task: Task | null,
  onEdit: (updatedTask: Task) => void,
  onDelete: (taskId: string | number) => void,
  onClose: () => void
) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateFinish, setDateFinish] = useState<string>("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      setDateFinish(task.dateFinish || "");
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onEdit({
        id: task.id,
        name,
        description,
        dateFinish,
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (task) {
      onDelete(task.id);
      onClose();
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    dateFinish,
    setDateFinish,
    handleSave,
    handleDelete,
  };
};
