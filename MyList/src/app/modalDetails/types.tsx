export interface TaskDetailModalProps {
  visible: boolean;
  onClose: () => void;
  task: {
    id: number | string;
    name: string;
    description?: string;
    dateCreated: string;
    dateFinish?: string;
    completed: boolean;
  } | null;
  onDelete: (id: number | string) => void; // Callback for deleting the task
  onEdit: (task: any) => void; // Callback for editing the task
}
