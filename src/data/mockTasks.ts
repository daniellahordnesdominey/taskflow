import type { Task } from "../types/Task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Lage frontend",
    description: "Sette opp React og TypeScript",
    status: "DONE",
  },
  {
    id: 2,
    title: "Lage backend",
    description: "Sette opp Java og Spring Boot",
    status: "TODO",
  },
  {
    id: 3,
    title: "Koble til database",
    description: "Sette opp PostgreSQL",
    status: "IN_PROGRESS",
  },
];