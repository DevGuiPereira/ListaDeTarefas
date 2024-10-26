import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { style } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/button";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import { useControllerMain } from "./controller";

const Main = () => {
 const controller = useControllerMain()

  return (
    <View style={style.container}>
      <FlatList
        data={controller.tasks}
        renderItem={controller.renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={style.taskList}
        ListEmptyComponent={<Text style={style.emptyText}>No tasks.</Text>}
      />
      <View style={style.absoluteButtonContainer}>
        <Button
          title="Create Task"
          onPress={() => controller.setModalVisible(true)}
        />
        <Button title="Delete All Tasks" onPress={controller.deleteAllTasks} />
      </View>
      <CreateTaskModal
        visible={controller.modalVisible}
        onClose={() => controller.setModalVisible(false)}
      />
      <EditTaskModal
        visible={controller.editModalVisible}
        onClose={() => controller.setEditModalVisible(false)}
        task={controller.currentTask}
        onEdit={controller.editTask}
        onDelete={controller.deleteTask}
      />
      <TaskDetailModal
        visible={controller.detailModalVisible}
        onClose={() => controller.setDetailModalVisible(false)}
        task={controller.currentTask}
        onDelete={controller.deleteTask}
        onEdit={(task) => {
          controller.setCurrentTask(task);
          controller.setEditModalVisible(true);
        }}
      />
    </View>
  );
};

export default Main;
