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
import InputText from "../../components/inputText";
import DateInputComponent from "../../components/inputDate";
import Button from "../../components/button";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const saveTask = async () => {
    if (!taskName) {
      Alert.alert("Validation", "Task name is required.");
      return;
    }

    try {
      const lastId = await AsyncStorage.getItem("@task_last_id");
      const newId = lastId ? parseInt(lastId) + 1 : 1;

      // Captura a data de criação e formata para MM-DD-YYYY
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
      };

      await AsyncStorage.setItem(`@task_${newId}`, JSON.stringify(task));
      await AsyncStorage.setItem("@task_last_id", newId.toString());

      // Limpa os campos
      setTaskName("");
      setTaskDescription("");
      setTaskDateFinish("");

      // Constrói a mensagem do alerta dinamicamente
      let alertMessage = `Here are the details of the saved task:\n\nName: ${task.name}\nCreated At: ${task.dateCreated}`;

      if (task.description) {
        alertMessage += `\nDescription: ${task.description}`;
      }

      if (task.dateFinish) {
        alertMessage += `\nDate: ${task.dateFinish}`;
      }

      Alert.alert("Task Saved", alertMessage);

      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
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
              placeholder="Date:MM-DD-YYYY"
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
