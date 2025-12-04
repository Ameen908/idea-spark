import { useState, useEffect } from 'react';
import { Task, Priority, Category } from '@/types/task';

const STORAGE_KEY = 'taskflow-tasks';

const initialTasks: Task[] = [
  { id: '1', title: 'Review project requirements', completed: true, priority: 'high', category: 'work', createdAt: new Date() },
  { id: '2', title: 'Design wireframes for homepage', completed: false, priority: 'high', category: 'work', createdAt: new Date() },
  { id: '3', title: 'Buy groceries', completed: false, priority: 'medium', category: 'shopping', createdAt: new Date() },
  { id: '4', title: 'Morning workout routine', completed: true, priority: 'medium', category: 'health', createdAt: new Date() },
  { id: '5', title: 'Call mom', completed: false, priority: 'low', category: 'personal', createdAt: new Date() },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((t: Task) => ({
          ...t,
          category: t.category || 'other',
          createdAt: new Date(t.createdAt),
        }));
      } catch {
        return initialTasks;
      }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Priority, category: Category) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
