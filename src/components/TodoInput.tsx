import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag } from 'lucide-react';
import { Priority, Category } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: Priority, category: Category, dueDate: string | null) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(
        input.trim(),
        priority,
        category,
        dueDate ? dueDate : null
      );
      setInput('');
      setPriority('medium');
      setCategory('personal');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          Add
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Tag size={20} className="text-gray-500" />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Tag size={20} className="text-gray-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-gray-500" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>
      </div>
    </form>
  );
}