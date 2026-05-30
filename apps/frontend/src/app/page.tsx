"use client";

import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function HomePage() {
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const utils = trpc.useUtils();

  const { data: todos = [], isLoading } = trpc.todos.getAll.useQuery();

  const createMutation = trpc.todos.create.useMutation({
    onSuccess: () => utils.todos.getAll.invalidate(),
  });

  const updateMutation = trpc.todos.update.useMutation({
    onSuccess: () => utils.todos.getAll.invalidate(),
  });

  const deleteMutation = trpc.todos.delete.useMutation({
    onSuccess: () => utils.todos.getAll.invalidate(),
  });

  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;
    createMutation.mutate({ title });
    setNewTitle("");
  };

  const handleToggle = (id: string, completed: boolean) => {
    updateMutation.mutate({ id, completed: !completed });
  };

  const handleEditSave = (id: string) => {
    const title = editTitle.trim();
    if (title) updateMutation.mutate({ id, title });
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const completed = todos.filter((t) => t.completed).length;

  return (
    <main>
      <h1>todo_list</h1>
      <p className="subtitle">NestJS · tRPC · Next.js · monorepo PoC</p>

      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
          autoFocus
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={!newTitle.trim() || createMutation.isPending}
        >
          {createMutation.isPending ? "adding…" : "+ add"}
        </button>
      </form>

      {isLoading ? (
        <div className="empty">
          <span className="loading" />
          fetching todos…
        </div>
      ) : todos.length === 0 ? (
        <div className="empty">no todos yet. add one above ↑</div>
      ) : (
        <>
          <div className="stats">
            <span>{todos.length} total</span>
            <span>{completed} done · {todos.length - completed} remaining</span>
          </div>
          <ul className="todo-list" style={{ listStyle: "none" }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item${todo.completed ? " completed" : ""}`}
              >
                <button
                  className={`todo-checkbox${todo.completed ? " checked" : ""}`}
                  onClick={() => handleToggle(todo.id, todo.completed)}
                  title="Toggle complete"
                >
                  {todo.completed ? "✓" : ""}
                </button>

                {editId === todo.id ? (
                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => handleEditSave(todo.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSave(todo.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span
                    className="todo-title"
                    onDoubleClick={() => {
                      setEditId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    title="Double-click to edit"
                  >
                    {todo.title}
                  </span>
                )}

                <div className="todo-actions">
                  <button
                    className="btn-icon"
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => handleDelete(todo.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
