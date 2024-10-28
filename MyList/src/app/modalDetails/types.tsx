import { Task } from "../../server/taskService";

export interface TaskDetailModalProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
  onDelete: (id: string) => void; // Callback for deleting the task
  onEdit: (task: Task) => void; // Callback for editing the task
}
