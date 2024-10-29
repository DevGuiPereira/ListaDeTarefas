import React from "react";
import { View, Text, FlatList } from "react-native";
import { style } from "./style";
import ButtonNew from "../../components/buttonNew";
import CreateTaskModal from "../modalCreateTask";
import EditTaskModal from "../modalEdition";
import TaskDetailModal from "../modalDetails";
import { useControllerMain } from "./controller";

const Main = () => {
  const controller = useControllerMain();

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
        <ButtonNew onPress={() => controller.setModalVisible(true)} />
      </View>
      <CreateTaskModal
        visible={controller.modalVisible}
        onClose={() => controller.onCloseModal()}
      />
      {controller.currentTask && (
        <EditTaskModal
          visible={controller.editModalVisible}
          onClose={() => controller.setEditModalVisible(false)}
          task={controller.currentTask}
          onEdit={controller.editTask}
          onDelete={controller.deleteTask}
        />
      )}
      {controller.currentTask && (
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
      )}
    </View>
  );
};

export default Main;
