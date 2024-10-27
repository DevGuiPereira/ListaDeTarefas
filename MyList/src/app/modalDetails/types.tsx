export interface TaskDetailModalProps {
  visible: boolean;
  onClose: () => void;
  task: {
    id: string;
    name: string;
    description?: string;
    dateCreated: Date;
    dateFinish?: string;
    completed: boolean;
  } | null;
  onDelete: (id: string) => void; // Callback for deleting the task
  onEdit: (task: any) => void; // Callback for editing the task
}
