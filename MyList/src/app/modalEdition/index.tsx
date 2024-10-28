// EditTaskModal.tsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import InputComponent from "../../components/inputText"; // Adjust the import path as necessary
import DateInputComponent from "../../components/inputDate"; // Adjust the import path as necessary
import Button from "../../components/button"; // Your button component
import style from "./style"; // Adjust the import path as necessary
import { EditTaskModalProps } from "./types";
import { useEditTaskController } from "./controller";

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  const controller = useEditTaskController({
    task,
    onEdit,
    onDelete,
    onClose,
    visible,
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalBackground}>
          <View style={style.modalContainer}>
            <Text style={style.modalTitle}>Edit Task</Text>

            <InputComponent
              value={controller.name}
              placeholder="Task Name"
              onChangeText={controller.setName}
            />
            <InputComponent
              value={controller.description}
              placeholder="Task Description"
              onChangeText={controller.setDescription}
            />
            <DateInputComponent
              value={controller.dateFinish}
              placeholder="Due Date (MM-DD-YYYY)"
              onChangeText={controller.setDateFinish}
            />

            <View style={style.buttonContainer}>
              <Button title="Save" onPress={controller.handleSave} />
              <Button
                title="Delete Task"
                onPress={() => {
                  if (task) {
                    onDelete(task.id);
                    onClose();
                  }
                }}
              />
              <Button title="Cancel" onPress={onClose} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditTaskModal;
