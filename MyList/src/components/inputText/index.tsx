import React from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { style } from "./style";

interface InputComponentProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  placeholder,
  onChangeText,
}) => {

  return (
    <TextInput
      style={style.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#000"
    />
  );
};

export default InputComponent;
