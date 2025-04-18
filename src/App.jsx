import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleAdd = () => {
    if (task.trim() === "") return alert("Task cannot be empty!");
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEdit = (id) => {
    const newText = prompt("Edit your task:");
    if (newText && newText.trim()) {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 dark:bg-gray-900 p-4 flex justify-center transition-all">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center">To-Do List </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded shadow"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <TodoItem
              key={t.id}
              task={t}
              onToggle={() => toggleComplete(t.id)}
              onEdit={() => handleEdit(t.id)}
              onDelete={() => handleDelete(t.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
