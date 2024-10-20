import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import InputText from "../../components/inputText";
import DateInputComponent from "../../components/inputDate";
import Button from "../../components/button";
import { style } from "./style";

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
  const [taskDate, setTaskDate] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.modalOverlay}>
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>Create a New Task</Text>

          {/* Input for Task Name */}
          <InputText
            value={taskName}
            placeholder="Task Name"
            onChangeText={setTaskName}
          />

          {/* Input for Task Description */}
          <InputText
            value={taskDescription}
            placeholder="Task Description"
            onChangeText={setTaskDescription}
          />

          <DateInputComponent
            value={taskDate}
            placeholder="Date:YYYY-MM-DD"
            onChangeText={setTaskDate}
          />

          <Button title="Save Task" onPress={() => {}} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskModal;
