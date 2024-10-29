import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage, { Task } from "../../server/taskService";
import { useFocusEffect } from "@react-navigation/native";
import { themas } from "../../global/themas";

export function useControllerMain() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const server = new Storage();

  const getTasks = async () => {
    const tasks = await server.getTasks();
    setTasks(tasks);
  };

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, [])
  );

  const onCloseModal = () => {
    setModalVisible(false);
    getTasks();
  };

  const editTask = async (task: Task) => {
    await server.editTask(task);
    getTasks();
  };

  const deleteTask = async (id: string) => {
    await server.deleteTask(id);
    getTasks();
  };

  const openDetailModal = (task: any) => {
    setCurrentTask(task);
    setDetailModalVisible(true);
  };

  const renderTask = ({ item }: { item: Task }) => {
    return (
      <TouchableOpacity
        style={style.taskContainer}
        onPress={() => openDetailModal(item)}
      >
        <TouchableOpacity
          style={[
            style.circleButton,
            { backgroundColor: item.completed ? "green" : "white" },
            { borderColor: item.completed ? "green" : "red" },
          ]}
          onPress={() => toggleTaskCompletion(item.id)}
        />
        <View style={style.taskDetails}>
          <Text
            style={{
              ...style.taskTitle,
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed
                ? themas.colors.midGray
                : themas.colors.black,
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
  };

  const toggleTaskCompletion = async (id: string) => {
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
    renderTask,
    onCloseModal,
    editTask,
    deleteTask,
  };
}
