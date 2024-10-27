import React from "react";
import { TextInput, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { style } from "./style"; // Adjust the import path as necessary

interface DateInputComponentProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  errorMessage?: string; // Optional prop for error messages
}

const formatDate = (text: string) => {
  // Remove todos os caracteres que não são dígitos
  const digits = text.replace(/\D/g, "");
  const len = digits.length;

  // Adiciona os hifens na posição correta
  if (len < 3) return digits; // Para entradas menores que 3, retorne somente os dígitos
  if (len < 5) return `${digits.slice(0, 2)}/${digits.slice(2)}`; // mm-dd
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`; // mm-dd-yyyy
};

const parseDate = (dateString: string): Date | null => {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10) - 1; // Meses são indexados a partir de 0 em JavaScript
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return null; // Retorna null se a string não estiver no formato correto
};

const DateInputComponent: React.FC<DateInputComponentProps> = ({
  value,
  placeholder,
  onChangeText,
  errorMessage,
}) => {
  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(formatDate(text))} // Formata a data antes de chamar onChangeText
        keyboardType="numeric" // Teclado numérico para entrada de data
        placeholderTextColor="#000"
      />
    </View>
  );
};

export default DateInputComponent;
