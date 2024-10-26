// EditTaskModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import InputComponent from "../../components/inputText"; // Adjust the import path as necessary
import DateInputComponent from "../../components/inputDate"; // Adjust the import path as necessary
import Button from "../../components/button"; // Your button component
import  style  from "./style"; // Adjust the import path as necessary

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: {
    id: number | string;
    name: string;
    description?: string;
    dateFinish?: string;
  } | null;
  onEdit: (task: any) => void;
  onDelete: (id: number | string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateFinish, setDateFinish] = useState<string>("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description || "");
      setDateFinish(task.dateFinish || "");
    }
  }, [task]);

  const handleSave = () => {
    if (task) {
      onEdit({
        id: task.id,
        name,
        description,
        dateFinish,
      });
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          <Text style={style.modalTitle}>Edit Task</Text>

          <InputComponent
            value={name}
            placeholder="Task Name"
            onChangeText={setName}
          />
          <InputComponent
            value={description}
            placeholder="Task Description"
            onChangeText={setDescription}
          />
          <DateInputComponent
            value={dateFinish}
            placeholder="Due Date (MM-DD-YYYY)"
            onChangeText={setDateFinish}
          />

          <View style={style.buttonContainer}>
            <Button title="Save" onPress={handleSave} />
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
    </Modal>
  );
};

export default EditTaskModal;
