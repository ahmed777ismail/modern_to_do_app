import React from 'react';
import { CheckCircle2, XCircle, Trash2, Calendar, Tag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  personal: 'bg-blue-100 text-blue-800',
  work: 'bg-purple-100 text-purple-800',
  shopping: 'bg-pink-100 text-pink-800',
  health: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${
        todo.completed ? 'bg-gray-50' : 'bg-white'
      } border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`focus:outline-none transition-colors duration-200 ${
            todo.completed ? 'text-green-500' : 'text-gray-400 hover:text-purple-500'
          }`}
        >
          {todo.completed ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
        </button>
        
        <div className="flex-1">
          <span
            className={`block text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.text}
          </span>
          
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[todo.category]}`}>
              {todo.category}
            </span>
            {todo.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-600 transition-colors duration-200 ml-4"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}