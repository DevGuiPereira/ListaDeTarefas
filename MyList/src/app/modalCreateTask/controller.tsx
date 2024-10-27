// useControllerCreateTask.ts (Create a new file for the custom hook)

import { useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useControllerCreateTask(onClose: () => void) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDateFinish, setTaskDateFinish] = useState("");

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

  const saveTask = async () => {
    if (!taskName) {
      Alert.alert("Validation", "Task name is required.");
      return;
    }

    try {
      const existingTasks = await loadExistingTasks();

      let newId: number;
      do {
        newId = Math.floor(Math.random() * 10000); // Change range as needed
      } while (existingTasks.some((task: any) => task.id === newId));

      const date = new Date();
      const formattedDate = `${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}-${date.getFullYear()}`;

      const task = {
        id: newId,
        name: taskName,
        description: taskDescription || "",
        dateFinish: taskDateFinish || "",
        dateCreated: formattedDate,
        completed: false,
      };

      await AsyncStorage.setItem(`@task_${newId}`, JSON.stringify(task));

      // Clear input fields
      setTaskName("");
      setTaskDescription("");
      setTaskDateFinish("");

      onClose(); // Close the modal
    } catch (error) {
      Alert.alert("Error", "There was an issue saving the task.");
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
