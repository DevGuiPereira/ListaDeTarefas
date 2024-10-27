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
import { CreateTaskModalProps } from "./types";
import { useControllerCreateTask } from "./controller";
import InputText from "../../components/inputText";
import DateInputComponent from "../../components/inputDate";
import Button from "../../components/button";

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
}) => {

  const controller = useControllerCreateTask(onClose);

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
              value={controller.taskName}
              placeholder="Task Name"
              onChangeText={(text) => controller.setTaskName(text)}
            />

            <InputText
              value={controller.taskDescription}
              placeholder="Task Description"
              onChangeText={(text) => controller.setTaskDescription(text)}
            />

            <DateInputComponent
              value={controller.taskDateFinish}
              placeholder="Date: MM-DD-YYYY"
              onChangeText={(text) => controller.setTaskDateFinish(text)}
            />

            <Button title="Save Task" onPress={controller.saveTask} />
            <Button title="Close" onPress={onClose} />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
