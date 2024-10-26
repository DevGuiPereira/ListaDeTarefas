import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputText from "../../components/inputText";
import DateInputComponent from "../../components/inputDate";
import Button from "../../components/button";

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
}) => {
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

      let newId: number; // Explicitly declare the type of newId
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

      onClose();
    } catch (error) {
      Alert.alert("Error", "There was an issue saving the task.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.modalContent}
          >
            <Text style={style.modalTitle}>Create a New Task</Text>

            <InputText
              value={taskName}
              placeholder="Task Name"
              onChangeText={(text) => setTaskName(text)}
            />

            <InputText
              value={taskDescription}
              placeholder="Task Description"
              onChangeText={(text) => setTaskDescription(text)}
            />

            <DateInputComponent
              value={taskDateFinish}
              placeholder="Date: MM-DD-YYYY"
              onChangeText={(text) => setTaskDateFinish(text)}
            />

            <Button title="Save Task" onPress={saveTask} />
            <Button title="Close" onPress={onClose} />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
