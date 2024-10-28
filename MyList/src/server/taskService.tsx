import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export interface Task {
  id: string;
  name: string;
  description?: string;
  dateCreated: Date;
  dateFinish?: string;
  completed: boolean;
}
export interface CreatedTask {
  name: string;
  description?: string;
  dateFinish?: string;
}

class Storage {
  public async loadExistingTasks() {
    const keys = await AsyncStorage.getAllKeys();
    const taskKeys = keys.filter((key) => key.startsWith("@task_"));
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskstring = await AsyncStorage.getItem(key);
        return taskstring ? JSON.parse(taskstring) : null;
      })
    );
    return loadedTasks.filter((task) => task !== null);
  }

  public generateAlphanumericId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 10; // Ajuste o comprimento do ID conforme necessário
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  public async createTask(newTask: CreatedTask) {
    const { name, dateFinish, description } = newTask;
    if (!name) {
      Alert.alert("Validação", "O nome da tarefa é obrigatório.");
      return;
    }

    try {
      const existingTasks = await this.loadExistingTasks();
      let newId: string;

      do {
        newId = this.generateAlphanumericId();
      } while (existingTasks.some((task: Task) => task.id === newId));

      const date = new Date();
      const dateCreated = date.toISOString(); // Armazenar como data ISO

      const task = {
        id: newId,
        name,
        description,
        dateFinish,
        dateCreated,
        completed: false,
      };

      await AsyncStorage.setItem(`@task_${newId}`, JSON.stringify(task));
      return task;
    } catch (error) {
      Alert.alert("Error", ".");
      console.error("Error:", error);
      return null;
    }
  }

  // Load tasks from AsyncStorage
  public async loadTasks() {
    const keys = await AsyncStorage.getAllKeys();
    const taskKeys = keys.filter((key) => key.startsWith("@task_"));
    const loadedTasks = await Promise.all(
      taskKeys.map(async (key) => {
        const taskstring = await AsyncStorage.getItem(key);
        return taskstring ? JSON.parse(taskstring) : null;
      })
    );
    const filteredTasks = loadedTasks.filter((task) => task !== null);

    // Sort tasks by creation date
    const tasks = filteredTasks.sort((b, a) => {
      return (
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      );
    });

    return tasks;
  }

  // Toggle task completion
  public async toggleTaskCompletion(id: string) {
    try {
      const tasks = await this.getTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      await Promise.all(
        updatedTasks.map((task) =>
          AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task))
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  }

  // Delete a specific task
  public async deleteTask(id: string) {
    try {
      await AsyncStorage.removeItem(`@task_${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Edit a specific task
  public async editTask(updatedTask: Task) {
    console.log("!!!", updatedTask);
    try {
      const tasks = await this.getTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      await Promise.all(
        updatedTasks.map((task) =>
          AsyncStorage.setItem(`@task_${task.id}`, JSON.stringify(task))
        )
      );
    } catch (error) {
      console.error("Error editing task:", error);
    }
  }

  // Delete all tasks
  public async deleteAllTasks() {
    try {
      await AsyncStorage.clear();
    } catch (error) {}
  }

  // Getters and Setters
  public async getTasks() {
    const tasks = await this.loadTasks();
    return tasks;
  }
}

export default Storage;
