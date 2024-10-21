import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { style } from "./style";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themas";
import CreateTaskModal from "../modal";
import Button from "../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Main = () => {
  // Estado para controlar a visibilidade do modal
  const [modalVisible, setModalVisible] = useState(false);

  // Função para abrir o modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={style.container}>
      <View style={style.box}>
        <TouchableOpacity style={style.button} onPress={openModal}>
          <Text style={style.buttonText}>Create Task</Text>
        </TouchableOpacity>
        <CreateTaskModal visible={modalVisible} onClose={closeModal} />
      </View>
    </View>
  );
};
export default Main;
