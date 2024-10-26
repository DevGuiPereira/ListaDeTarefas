import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/button";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";

export function useControllerMain() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any | null>(null);

  const loadTasks = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const taskKeys = keys.filter((key) => key.startsWith("@task_"));
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskString = await AsyncStorage.getItem(key);
        return taskString ? JSON.parse(taskString) : null;
      })
    );
    setTasks(loadedTasks.filter((task) => task !== null));
  };

  useEffect(() => {
    loadTasks();
  }, [modalVisible, editModalVisible]);

  const renderTask = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={style.taskContainer}
      onPress={() => openDetailModal(item)}
    >
      <TouchableOpacity
        style={[
          style.circleButton,
          { backgroundColor: item.completed ? "green" : "red" },
        ]}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <View style={style.taskDetails}>
        <Text
          style={{
            ...style.taskTitle,
            textDecorationLine: item.completed ? "line-through" : "none",
            color: item.completed ? "#999" : "#000",
          }}
        >
          {item.name}
        </Text>
        {item.description && !item.completed && (
          <Text style={style.taskDescription}>{item.description}</Text>
        )}
        {item.dateFinish && !item.completed && (
          <Text style={style.taskDate}>Due: {item.dateFinish}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const openDetailModal = (task: any) => {
    setCurrentTask(task);
    setDetailModalVisible(true);
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
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      await Promise.all(
        updatedTasks.map((task) =>
          AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task))
        )
      );
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

  return {
    modalVisible,
    setModalVisible,
    editModalVisible,
    setEditModalVisible,
    detailModalVisible,
    setDetailModalVisible,
    tasks,
    currentTask,
    setCurrentTask,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    deleteAllTasks,
    renderTask,
  };
}
