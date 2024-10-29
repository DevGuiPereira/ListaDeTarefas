import React from "react";
import { TextInput, TextStyle, StyleProp } from "react-native";
import { style } from "./style";

interface InputComponentProps {
  value: string;
  placeholder: string;
  customStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  placeholder,
  onChangeText,
  customStyle,
}) => {
  return (
    <TextInput
      style={[style.input, customStyle]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#000"
    />
  );
};

export default InputComponent;
