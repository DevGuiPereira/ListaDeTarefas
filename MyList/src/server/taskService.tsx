import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any | null>(null);


export function useServer(){
    const loadTasks = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const taskKeys = keys.filter((key) => key.startsWith("@task_"));
  const loadedTasks = await Promise.all(
    taskKeys.map(async (key) => {
      const taskString = await AsyncStorage.getItem(key);
      return taskString ? JSON.parse(taskString) : null;
    })
  );
  const filteredTasks = loadedTasks.filter((task) => task !== null);

  // Ordenar as tarefas pela data de criação
  const sortedTasks = filteredTasks.sort((a, b) => {
    return (
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  });

  setTasks(sortedTasks);
};

  const toggleTaskCompletion = async (id: number | string) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
            await Promise.all(
        updatedTasks.map((task) =>
          AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task))
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };
  const deleteTask = async (id: string | number) => {
  try {
    // Remove the task from AsyncStorage
    await AsyncStorage.removeItem(`@task_${id}`);

    // Update the state to remove the task
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

      const editTask = async (updatedTask: any) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      setTasks(updatedTasks);
            await Promise.all(
        updatedTasks.map((task) =>
          AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task))
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

    const deleteAllTasks = async () => {
    try {
      setTasks([]);
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };


    return{
        loadTasks,
        toggleTaskCompletion,
        deleteAllTasks,
        deleteTask,
        editTask
    }
}