/*import React, { useEffect, useState } from "react";
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
import { EditTaskModalProps, Task } from "./types";

export function useControllerEdition() {
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
  return {};
}*/
