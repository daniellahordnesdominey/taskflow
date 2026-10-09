import type { Task } from "../types/Task";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`status ${task.status}`}>
        {task.status}
      </span>
    </div>
  );
}

export default TaskCard;