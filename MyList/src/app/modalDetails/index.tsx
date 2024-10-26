// TaskDetailModal.tsx
import React from "react";
import { View, Text, Modal } from "react-native";
import Button from "../../components/button"; // Import the Button component
import { style } from "./style"; // Import your styles here

interface TaskDetailModalProps {
  visible: boolean;
  onClose: () => void;
  task: {
    id: number | string;
    name: string;
    description?: string;
    dateCreated: string;
    dateFinish?: string;
    completed: boolean;
  } | null;
  onDelete: (id: number | string) => void; // Callback for deleting the task
  onEdit: (task: any) => void; // Callback for editing the task
}

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
          <Text style={style.taskTitle}>{task?.name}</Text>
          {task?.description && (
            <Text style={style.taskDescription}>{task.description}</Text>
          )}
          <Text style={style.taskDate}>Created At: {task?.dateCreated}</Text>
          {task?.dateFinish && (
            <Text style={style.taskDate}>Due: {task.dateFinish}</Text>
          )}

          {/* Container for buttons */}
          <View style={style.buttonContainer}>
            <Button title="Close" onPress={onClose} />
            <Button
              title="Edit Task" // Edit Task button
              onPress={() => {
                if (task) {
                  onEdit(task); // Pass the task to edit
                  onClose(); // Close the modal after calling edit
                }
              }}
            />
            <Button
              title="Delete Task"
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
