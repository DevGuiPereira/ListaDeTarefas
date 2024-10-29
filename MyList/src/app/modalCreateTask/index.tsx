import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { style } from "./style";
import { CreateTaskModalProps } from "./types";
import { useControllerCreateTask } from "./controller";
import InputText from "../../components/inputText";
import DateInputComponent from "../../components/inputDate";
import ButtonClose from "../../components/buttonClose";
import ButtonSave from "../../components/buttonSave";

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  visible,
  onClose,
}) => {
  const controller = useControllerCreateTask(onClose);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.modalContent}
          >
            <View style={style.buttonContainerClose}>
              <ButtonClose title="X" onPress={onClose} />
            </View>

            <Text style={style.modalTitle}>Create a New Task</Text>

            <InputText
              value={controller.taskName}
              placeholder="Task Name"
              onChangeText={(text) => controller.setTaskName(text)}
            />

            <InputText
              value={controller.taskDescription}
              placeholder="Task Description"
              onChangeText={(text) => controller.setTaskDescription(text)}
            />

            <DateInputComponent
              value={controller.taskDateFinish}
              placeholder="Date: MM/DD/YYYY"
              onChangeText={(text) => controller.setTaskDateFinish(text)}
            />
            <View style={style.buttonContainerSave}>
              <ButtonSave title="Save Task" onPress={controller.saveTask} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateTaskModal;
