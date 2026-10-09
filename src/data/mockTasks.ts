import type { Task } from "../types/Task";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Bygge frontend",
    description: "Sette opp React og TypeScript",
    status: "DONE",
  },
  {
    id: 2,
    title: "Utvikle API",
    description: "Lage backend med Java og Spring Boot",
    status: "TODO",
  },
  {
    id: 3,
    title: "Koble til database",
    description: "Integrere PostgreSQL",
    status: "IN_PROGRESS",
  },
];