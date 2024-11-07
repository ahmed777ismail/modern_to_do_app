import React from 'react';
import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const completedCount = todos.filter(t => t.completed).length;
  const highPriorityCount = todos.filter(t => t.priority === 'high' && !t.completed).length;
  const dueSoonCount = todos.filter(t => {
    if (!t.dueDate || t.completed) return false;
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }).length;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-center gap-6 text-sm">
        <div className="text-gray-600">
          <span className="font-semibold">{todos.length}</span> total
        </div>
        <div className="text-green-600">
          <span className="font-semibold">{completedCount}</span> completed
        </div>
        {highPriorityCount > 0 && (
          <div className="text-red-600">
            <span className="font-semibold">{highPriorityCount}</span> high priority
          </div>
        )}
        {dueSoonCount > 0 && (
          <div className="text-orange-600">
            <span className="font-semibold">{dueSoonCount}</span> due soon
          </div>
        )}
      </div>
    </div>
  );
}