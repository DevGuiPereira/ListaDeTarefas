// useControllerCreateTask.ts
import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useControllerCreateTask(onClose: () => void) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskDateFinish, setTaskDateFinish] = useState<string>("");

  const loadExistingTasks = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const taskKeys = keys.filter((key) => key.startsWith("@task_"));
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskString = await AsyncStorage.getItem(key);
        return taskString ? JSON.parse(taskString) : null;
      })
    );
    return loadedTasks.filter((task) => task !== null);
  };

  const generateAlphanumericId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 10; // Ajuste o comprimento do ID conforme necessário
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const saveTask = async () => {
    if (!taskName) {
      Alert.alert("Validação", "O nome da tarefa é obrigatório.");
      return;
    }

    try {
      const existingTasks = await loadExistingTasks();
      let newId: string;

      do {
        newId = generateAlphanumericId();
      } while (existingTasks.some((task: any) => task.id === newId));

      const date = new Date();
      const formattedDate = date.toISOString(); // Armazenar como data ISO

      const task = {
        id: newId,
        name: taskName,
        description: taskDescription || "",
        dateFinish: taskDateFinish || "",
        dateCreated: formattedDate, // Alterado para ISO
        completed: false,
      };

      await AsyncStorage.setItem(`@task_${newId}`, JSON.stringify(task));

      // Limpar os campos de entrada
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
