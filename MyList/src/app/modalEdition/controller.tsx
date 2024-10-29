import { useState, useEffect } from "react";
import { EditTaskModalProps } from "./types";

export const useEditTaskController = ({
  task,
  onEdit,
  onDelete,
  onClose,
}: EditTaskModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateFinish, setDateFinish] = useState<string>("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      setDateFinish(task.dateFinish || "");
    }
    console.log(task);
  }, [task]);

  const handleSave = () => {
    if (task) {
      const newTask = { ...task, name, description, dateFinish };
      onEdit(newTask);
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
