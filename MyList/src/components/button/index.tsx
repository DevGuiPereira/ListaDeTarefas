import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { style } from "./style";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style: customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
