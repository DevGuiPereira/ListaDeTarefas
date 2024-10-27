
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


export interface EditTaskModalProps {
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
export interface Task {
  id: number | string;
  name: string;
  description?: string;
  dateFinish?: string;
}
