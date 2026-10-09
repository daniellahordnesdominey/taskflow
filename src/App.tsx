import { mockTasks } from "./data/mockTasks";
import TaskCard from "./components/TaskCard";
import "./App.css";

function App() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <h2>Mine oppgaver</h2>

      <div className="task-list">
        {mockTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}

export default App;
