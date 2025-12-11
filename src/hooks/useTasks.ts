import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Task, Priority, Category } from '@/types/task';
import { useToast } from '@/hooks/use-toast';
import { useNotificationSound } from './useNotificationSound';
import { useSettings } from './useSettings';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const { playSound } = useNotificationSound();
  const { settings } = useSettings();

  // Fetch tasks from database
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to load tasks',
          description: error.message,
        });
      } else {
        setTasks(
          data.map((t) => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            priority: t.priority as Priority,
            category: t.category as Category,
            dueDate: t.due_date ? new Date(t.due_date) : undefined,
            createdAt: new Date(t.created_at),
          }))
        );
      }
      setLoading(false);
    };

    fetchTasks();
  }, [user, toast]);

  const addTask = async (title: string, priority: Priority, category: Category, dueDate?: Date) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title,
        priority,
        category,
        due_date: dueDate?.toISOString(),
      })
      .select()
      .single();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to add task',
        description: error.message,
      });
    } else {
      const newTask: Task = {
        id: data.id,
        title: data.title,
        completed: data.completed,
        priority: data.priority as Priority,
        category: data.category as Category,
        dueDate: data.due_date ? new Date(data.due_date) : undefined,
        createdAt: new Date(data.created_at),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update task',
        description: error.message,
      });
    } else {
      // Play sound when completing a task
      if (!task.completed) {
        playSound(settings.completionSound);
      }
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    }
  };

  const reorderTasks = useCallback((reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
  }, []);

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to delete task',
        description: error.message,
      });
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const updateTask = async (id: string, title: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ title })
      .eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update task',
        description: error.message,
      });
      return false;
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title } : t))
      );
      return true;
    }
  };

  return { tasks, loading, addTask, toggleTask, deleteTask, updateTask, reorderTasks };
}
