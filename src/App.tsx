import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import WorkspacePage from "./pages/WorkspacePage";
import { mockTasks } from "./data/mockTasks";
import type { Task, TaskStatus } from "./types/Task";
import "./App.css";

type Page = "home" | "workspace";

function getInitialTasks(): Task[] {
  try {
    const saved = localStorage.getItem("taskflow-tasks");

    if (saved) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed as Task[];
      }
    }
  } catch {
    console.error("Kunne ikke laste lagrede oppgaver.");
  }

  return mockTasks;
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks);

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title: string, description: string) {
    const task: Task = {
      id: Date.now(),
      title,
      description,
      status: "TODO",
    };

    setTasks((previous) => [...previous, task]);
  }

  function updateTaskStatus(id: number, status: TaskStatus) {
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }

  function deleteTask(id: number) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  function navigateTo(nextPage: Page) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return page === "home" ? (
    <LandingPage onEnter={() => navigateTo("workspace")} />
  ) : (
    <WorkspacePage
      tasks={tasks}
      onBack={() => navigateTo("home")}
      onAddTask={addTask}
      onUpdateStatus={updateTaskStatus}
      onDeleteTask={deleteTask}
    />
  );
}

export default App;
