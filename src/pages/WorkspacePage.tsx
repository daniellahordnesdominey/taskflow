import { useState } from "react";
import type { FormEvent } from "react";
import type { Task, TaskStatus } from "../types/Task";

interface WorkspacePageProps {
  tasks: Task[];
  onBack: () => void;
  onAddTask: (title: string, description: string) => void;
  onUpdateStatus: (id: number, status: TaskStatus) => void;
  onDeleteTask: (id: number) => void;
}

type Filter = "ALL" | TaskStatus;

const filters: { value: Filter; label: string }[] = [
  { value: "ALL", label: "Alle" },
  { value: "TODO", label: "Ikke startet" },
  { value: "IN_PROGRESS", label: "Pågår" },
  { value: "DONE", label: "Fullført" },
];

function WorkspacePage({
  tasks,
  onBack,
  onAddTask,
  onUpdateStatus,
  onDeleteTask,
}: WorkspacePageProps) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const completed = tasks.filter((task) => task.status === "DONE").length;

  const inProgress = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const visibleTasks = tasks.filter(
    (task) => filter === "ALL" || task.status === filter,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask(title.trim(), description.trim());

    setTitle("");
    setDescription("");
    setShowForm(false);
    setFilter("ALL");
  }

  return (
    <div className="workspace-page">
      {/* NAVIGASJON */}
      <header className="workspace-nav">
        <button className="brand brand-button" type="button" onClick={onBack}>
          <span className="brand-symbol">✳</span>
          taskflow<span className="brand-dot">.</span>
        </button>

        <div className="workspace-nav-right">
          <span>DITT DIGITALE ATELIER</span>

          <button type="button" onClick={onBack}>
            ← Til forsiden
          </button>
        </div>
      </header>

      <main className="workspace-main workspace-layout">
        {/* DEL 1 – OVERSIKT */}
        <section
          className="workspace-panel overview-panel"
          aria-labelledby="overview-title"
        >
          <div className="panel-label">
            <span>01 / OVERSIKT</span>
            <span>ET STED Å SAMLE TANKENE</span>
          </div>

          <div className="overview-top">
            <div className="overview-intro">
              <h1 id="overview-title">
                Her skjer <em>det.</em>
              </h1>

              <p>Én ting om gangen. Alt på ett sted.</p>
            </div>

            <div className="overview-progress">
              <div className="progress-top">
                <span>DIN FREMDRIFT</span>
                <strong>{progress}%</strong>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-label="Fullførte oppgaver"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="progress-caption">
                {completed} av {tasks.length} oppgaver fullført
              </span>
            </div>
          </div>

          <div className="overview-stats">
            <div className="stat-item">
              <span>ALLE OPPGAVER</span>
              <strong>{String(tasks.length).padStart(2, "0")}</strong>
            </div>

            <div className="stat-item">
              <span>PÅGÅR</span>
              <strong>{String(inProgress).padStart(2, "0")}</strong>
            </div>

            <div className="stat-item">
              <span>FULLFØRT</span>
              <strong>{String(completed).padStart(2, "0")}</strong>
            </div>
          </div>
        </section>

        {/* DEL 2 – ARBEIDSBORD */}
        <section
          className="workspace-panel workboard-panel"
          aria-labelledby="workboard-title"
        >
          <div className="panel-label">
            <span>02 / ARBEIDSBORD</span>
            <span>FRA TANKE TIL HANDLING</span>
          </div>

          <div className="workboard-heading">
            <div>
              <h2 id="workboard-title">
                Mine oppgaver<span>.</span>
              </h2>

              <p>Små steg. God fremdrift.</p>
            </div>

            <button
              className="add-task-button"
              type="button"
              onClick={() => setShowForm((previous) => !previous)}
              aria-expanded={showForm}
            >
              {showForm ? "Lukk −" : "+ Ny oppgave"}
            </button>
          </div>

          {showForm && (
            <form className="task-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <span>NY OPPGAVE</span>
                <h3>Hva skal gjøres?</h3>
              </div>

              <label htmlFor="task-title">OPPGAVENAVN</label>

              <input
                id="task-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Gi oppgaven et navn"
                required
              />

              <label htmlFor="task-description">BESKRIVELSE</label>

              <textarea
                id="task-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Skriv litt om oppgaven ..."
                rows={2}
              />

              <button className="submit-task" type="submit">
                Legg til oppgave ↗
              </button>
            </form>
          )}

          <div className="task-filters" aria-label="Filtrer oppgaver">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="editorial-task-list">
            {visibleTasks.length === 0 ? (
              <p className="empty-state">
                Ingen oppgaver her ennå. Litt pusterom.
              </p>
            ) : (
              visibleTasks.map((task, index) => (
                <article className="editorial-task" key={task.id}>
                  <span className="editorial-task-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="editorial-task-content">
                    <h3>{task.title}</h3>
                    <p>{task.description || "Ingen beskrivelse lagt til."}</p>
                  </div>

                  <select
                    aria-label={`Status for ${task.title}`}
                    className={`task-status-select ${task.status}`}
                    value={task.status}
                    onChange={(event) =>
                      onUpdateStatus(task.id, event.target.value as TaskStatus)
                    }
                  >
                    <option value="TODO">Ikke startet</option>
                    <option value="IN_PROGRESS">Pågår</option>
                    <option value="DONE">Fullført</option>
                  </select>

                  <button
                    className="delete-task"
                    type="button"
                    onClick={() => onDeleteTask(task.id)}
                    aria-label={`Slett ${task.title}`}
                  >
                    ×
                  </button>
                </article>
              ))
            )}
          </div>

          <div className="task-list-footer">
            <span>{visibleTasks.length} OPPGAVER VIST</span>
            <span>ÉN TING OM GANGEN ↗</span>
          </div>
        </section>
      </main>

      <footer className="workspace-footer">
        <span>TASKFLOW / DITT DIGITALE ATELIER</span>
        <span>DESIGNET FOR FREMDRIFT</span>
      </footer>
    </div>
  );
}

export default WorkspacePage;
