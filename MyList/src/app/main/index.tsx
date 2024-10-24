import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { style } from "./style"; // Assuming your styles are in a separate file
import CreateTaskModal from "../modalCreateTask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themas } from "../../global/themas";

const Main = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);

  const showModal = () => {
    setModalVisible(!modalVisible);
  };

  // Função para buscar as tarefas salvas no AsyncStorage
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

  // Carregar tarefas quando o componente for montado ou quando o modal fechar
  useEffect(() => {
    loadTasks();
  }, [modalVisible]);

  // Função para renderizar cada tarefa na lista
  const renderTask = ({ item }: { item: any }) => (
    <TouchableOpacity style={style.taskContainer}>
      <TouchableOpacity
        style={[
          style.circleButton,
          { backgroundColor: item.completed ? "green" : "red" }, // Change color based on completion status
        ]}
        onPress={() => toggleTaskCompletion(item.id)} // Function to toggle completion
      />
      <View style={style.taskDetails}>
        <Text
          style={[
            style.taskTitle,
            item.completed
              ? { textDecorationLine: "line-through", color: "#999" }
              : {}, // Apply strikethrough if completed
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

  // Function to toggle task completion
  const toggleTaskCompletion = async (id: number | string) => {
    try {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed; // Toggle the completed status
        }
        return task;
      });
      setTasks(updatedTasks);

      // Save updated tasks back to AsyncStorage
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
        <TouchableOpacity style={style.button} onPress={showModal}>
          <Text style={style.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </View>

      <CreateTaskModal visible={modalVisible} onClose={showModal} />
    </View>
  );
};

export default Main;
