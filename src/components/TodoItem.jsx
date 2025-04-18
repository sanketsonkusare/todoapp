export default function TodoItem({ task, onToggle, onEdit, onDelete }) {
    return (
      <li className={`flex justify-between items-center p-3 rounded 
        ${task.completed ? 'bg-green-100 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <span
          onClick={onToggle}
          className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}
        >
          {task.text}
        </span>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-500">✏️</button>
          <button onClick={onDelete} className="text-red-500">🗑️</button>
        </div>
      </li>
    );
  }
  