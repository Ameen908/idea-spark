import { useState, useEffect } from 'react';
import { Task, Priority } from '@/types/task';

const STORAGE_KEY = 'taskflow-tasks';

const initialTasks: Task[] = [
  { id: '1', title: 'Review project requirements', completed: true, priority: 'high', createdAt: new Date() },
  { id: '2', title: 'Design wireframes for homepage', completed: false, priority: 'high', createdAt: new Date() },
  { id: '3', title: 'Set up development environment', completed: true, priority: 'medium', createdAt: new Date() },
  { id: '4', title: 'Write unit tests', completed: false, priority: 'medium', createdAt: new Date() },
  { id: '5', title: 'Update documentation', completed: false, priority: 'low', createdAt: new Date() },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored).map((t: Task) => ({
          ...t,
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

  const addTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority,
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
