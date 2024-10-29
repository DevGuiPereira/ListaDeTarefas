// TaskDetailModal.tsx
import React from "react";
import { View, Text, Modal } from "react-native";
import { style } from "./style"; // Import your styles here
import { TaskDetailModalProps } from "./types";
import ButtonEdit from "../../components/buttonEdit";
import ButtonDelete from "../../components/buttonDelete";
import ButtonClose from "../../components/buttonClose";

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  visible,
  onClose,
  task,
  onDelete,
  onEdit, // New prop for editing the task
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.modalBackground}>
        <View style={style.modalContainer}>
          <View style={style.buttonContainerClose}>
            <ButtonClose title="X" onPress={onClose} />
          </View>
          <Text style={style.taskTitle}>{task?.name}</Text>
          {task?.description && (
            <Text style={style.taskDescription}>{task.description}</Text>
          )}
          <Text style={style.taskDate}>
            Created At:{" "}
            {task?.dateCreated
              ? new Date(task.dateCreated).toLocaleDateString("en-us")
              : ""}
          </Text>
          {task?.dateFinish && (
            <Text style={style.taskDate}>Due: {task.dateFinish}</Text>
          )}

          {/* Container for buttons */}
          <View style={style.buttonContainer}>
            <ButtonEdit
              title="Edit" // Edit Task button
              onPress={() => {
                if (task) {
                  onEdit(task); // Pass the task to edit
                  onClose(); // Close the modal after calling edit
                }
              }}
            />
            <ButtonDelete
              title="Delete"
              onPress={() => {
                if (task) {
                  onDelete(task.id); // Pass the task id to delete
                  onClose(); // Close the modal after deletion
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskDetailModal;
