import React from "react";
import { TouchableOpacity, Text, } from "react-native";
import { style } from "./style";
import { themas } from "../../global/themas";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ButtonSaveProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const ButtonSave: React.FC<ButtonSaveProps> = ({
  title,
  onPress,
  style: customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Ionicons name={"save-sharp"} color={themas.colors.white} size={20} />
      <Text style={style.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSave;