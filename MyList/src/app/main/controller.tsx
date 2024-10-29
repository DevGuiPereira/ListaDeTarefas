import React, { useCallback, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { style } from "./style"; // Importando estilos específicos
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenamento local
import Storage, { Task } from "../../server/taskService"; // Importando serviço para gerenciamento de tarefas
import { useFocusEffect } from "@react-navigation/native"; // Hook para lidar com eventos de foco da navegação
import { themas } from "../../global/themas"; // Temas globais de estilos

// Hook customizado que controla o estado e a lógica da tela principal
export function useControllerMain() {
  // Estados para gerenciar a visibilidade de modais e a lista de tarefas
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); // Armazenando as tarefas
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // Tarefa atualmente selecionada

  const server = new Storage(); // Instância do serviço de armazenamento de tarefas

  // Função assíncrona para buscar tarefas do servidor
  const getTasks = async () => {
    const tasks = await server.getTasks(); // Chamada ao serviço para obter tarefas
    setTasks(tasks); // Atualizando o estado com as tarefas recebidas
  };

  // Efeito que será executado quando o componente ganhar foco
  useFocusEffect(
    useCallback(() => {
      getTasks(); // Chamando a função para obter tarefas
    }, []) // O array vazio significa que esta função será chamada apenas na montagem do componente
  );

  // Função para fechar o modal e atualizar as tarefas
  const onCloseModal = () => {
    setModalVisible(false); // Esconde o modal de criação
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para editar uma tarefa
  const editTask = async (task: Task) => {
    await server.editTask(task); // Chamada ao serviço para editar a tarefa
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para deletar uma tarefa pelo ID
  const deleteTask = async (id: string) => {
    await server.deleteTask(id); // Chamada ao serviço para deletar a tarefa
    getTasks(); // Atualiza a lista de tarefas
  };

  // Função para abrir o modal de detalhes de uma tarefa
  const openDetailModal = (task: Task) => {
    setCurrentTask(task); // Define a tarefa atual para detalhes
    setDetailModalVisible(true); // Abre o modal de detalhes
  };

  // Função para renderizar cada tarefa na lista
  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={style.taskContainer} // Estilo do contêiner da tarefa
      onPress={() => openDetailModal(item)} // Ação ao pressionar a tarefa
    >
      <TouchableOpacity
        style={[
          style.circleButton,
          {
            backgroundColor: item.completed
              ? themas.colors.green // Cor se a tarefa estiver concluída
              : themas.colors.white,
          },
          {
            borderColor: item.completed
              ? themas.colors.green // Cor da borda se concluída
              : themas.colors.red,
          },
        ]}
        onPress={() => toggleTaskCompletion(item.id)} // Alterna o estado de conclusão da tarefa
      />
      <View style={style.taskDetails}>
        <Text
          style={{
            ...style.taskTitle,
            textDecorationLine: item.completed ? "line-through" : "none", // Riscado se concluído
            color: item.completed
              ? themas.colors.midGray // Cor do texto se concluído
              : themas.colors.black,
          }}
        >
          {item.name}
        </Text>
        {item.description &&
          !item.completed && ( // Exibe descrição se não concluído
            <Text style={style.taskDescription}>{item.description}</Text>
          )}
        {item.dateFinish &&
          !item.completed && ( // Exibe data de término se não concluído
            <Text style={style.taskDate}>Due: {item.dateFinish}</Text>
          )}
      </View>
    </TouchableOpacity>
  );

  // Função para alternar o estado de conclusão da tarefa
  const toggleTaskCompletion = async (id: string) => {
    try {
      const updatedTasks = tasks.map(
        (task) =>
          task.id === id ? { ...task, completed: !task.completed } : task // Atualiza a tarefa específica
      );
      setTasks(updatedTasks); // Atualiza o estado das tarefas
      await Promise.all(
        updatedTasks.map(
          (task) =>
            AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task)) // Salva a tarefa atualizada no AsyncStorage
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error); // Tratamento de erro
    }
  };

  // Retorna as funções e estados para serem usados no componente principal
  return {
    modalVisible,
    setModalVisible,
    editModalVisible,
    setEditModalVisible,
    detailModalVisible,
    setDetailModalVisible,
    tasks,
    currentTask,
    setCurrentTask,
    toggleTaskCompletion,
    renderTask,
    onCloseModal,
    editTask,
    deleteTask,
  };
}
