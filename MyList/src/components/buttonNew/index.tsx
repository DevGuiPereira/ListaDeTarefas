import React from "react";
import { TouchableOpacity,} from "react-native";
import { style } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { themas } from "../../global/themas";

interface ButtonNewProps {
  onPress: () => void;
}

const ButtonNew: React.FC<ButtonNewProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.button}>
      <Ionicons name="add-circle-sharp" color={themas.colors.red} size={80} />
    </TouchableOpacity>
  );
};

export default ButtonNew;
