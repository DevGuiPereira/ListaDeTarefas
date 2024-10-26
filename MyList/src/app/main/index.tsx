// Main.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { style } from "./style";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/button"; // Import your custom Button component

const Main = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any | null>(null);

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  const loadTasks = async () => {
    try {
      const lastId = await AsyncStorage.getItem("@task_last_id");
      const loadedTasks = [];

      for (let i = 1; i <= (lastId ? parseInt(lastId) : 0); i++) {
        const taskString = await AsyncStorage.getItem(`@task_${i}`);
        if (taskString) {
          loadedTasks.push(JSON.parse(taskString));
        }
      }

      setTasks(loadedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
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
          style={[
            style.taskTitle,
            item.completed
              ? { textDecorationLine: "line-through", color: "#999" }
              : {},
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={[
            style.taskDate,
            item.completed
              ? { textDecorationLine: "line-through", color: "#999" }
              : {},
          ]}
        >
          Created At: {item.dateCreated}
        </Text>
        {item.description && !item.completed ? (
          <Text style={style.taskDescription}>{item.description}</Text>
        ) : null}
        {item.dateFinish && !item.completed ? (
          <Text style={style.taskDate}>Due: {item.dateFinish}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const openEditModal = (task: any) => {
    setCurrentTask(task);
    setEditModalVisible(true);
  };

  const openDetailModal = (task: any) => {
    setCurrentTask(task);
    setDetailModalVisible(true);
  };

  const toggleTaskCompletion = async (id: number | string) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      });
      setTasks(updatedTasks);

      await AsyncStorage.setItem(
        "@task_last_id",
        JSON.stringify(updatedTasks.length)
      );
      updatedTasks.forEach(async (task, index) => {
        await AsyncStorage.setItem(`@task_${index + 1}`, JSON.stringify(task));
      });
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  const deleteTask = async (id: number | string) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      await AsyncStorage.setItem(
        "@task_last_id",
        JSON.stringify(updatedTasks.length)
      );
      updatedTasks.forEach(async (task, index) => {
        await AsyncStorage.setItem(`@task_${index + 1}`, JSON.stringify(task));
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = async (updatedTask: {
    id: number | string;
    name: string;
    description?: string;
    dateFinish?: string;
  }) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return { ...task, ...updatedTask };
        }
        return task;
      });
      setTasks(updatedTasks);

      await AsyncStorage.setItem(
        "@task_last_id",
        JSON.stringify(updatedTasks.length)
      );
      updatedTasks.forEach(async (task, index) => {
        await AsyncStorage.setItem(`@task_${index + 1}`, JSON.stringify(task));
      });
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

  return (
    <View style={style.container}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.taskList}
        ListEmptyComponent={
          <Text style={style.emptyText}>No tasks available.</Text>
        }
      />

      <View style={style.absoluteButtonContainer}>
        <Button title="Create Task" onPress={showModal} />
        <Button title="Delete All Tasks" onPress={deleteAllTasks} />
      </View>

      <CreateTaskModal visible={modalVisible} onClose={showModal} />
      <EditTaskModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        task={currentTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
      <TaskDetailModal
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        task={currentTask}
        onDelete={deleteTask}
        onEdit={openEditModal}
      />
    </View>
  );
};

export default Main;
