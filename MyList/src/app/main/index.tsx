import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { style } from "./style";
import CreateTaskModal from "../modalCreateTask";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <Text style={style.taskTitle}>{item.name}</Text>
      <Text style={style.taskDate}>Created At: {item.dateCreated}</Text>
      {item.description ? (
        <Text style={style.taskDescription}>{item.description}</Text>
      ) : null}
      {item.dateFinish ? (
        <Text style={style.taskDate}>Due: {item.dateFinish}</Text>
      ) : null}
    </TouchableOpacity>
  );

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
