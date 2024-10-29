// useControllerCreateTask.ts
import { useState } from "react";
import { Alert } from "react-native";
import Storage from "../../server/taskService";

export function useControllerCreateTask(onClose: () => void) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDateFinish, setTaskDateFinish] = useState<string>("");
  const storage = new Storage();

  const saveTask = async () => {
    try {
      const newTask = {
        name: taskName,
        dateFinish: taskDateFinish,
        description: taskDescription,
      };
      await storage.createTask(newTask);

      setTaskName("");
      setTaskDescription("");
      setTaskDateFinish("");

      onClose(); // Fechar o modal
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao salvar a tarefa.");
      console.error("Erro ao salvar a tarefa:", error); // Adicione log de erro
    }
  };

  return {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    taskDateFinish,
    setTaskDateFinish,
    saveTask,
  };
}
