import { useState, useMemo } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { ProgressStats } from '@/components/ProgressStats';
import { CategoryFilter } from '@/components/CategoryFilter';
import { CheckSquare } from 'lucide-react';
import { Category, CATEGORIES } from '@/types/task';

const Index = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredTasks = useMemo(() => {
    if (selectedCategory === 'all') return tasks;
    return tasks.filter((task) => task.category === selectedCategory);
  }, [tasks, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category | 'all', number> = {
      all: tasks.length,
      work: 0,
      personal: 0,
      shopping: 0,
      health: 0,
      other: 0,
    };
    tasks.forEach((task) => {
      counts[task.category]++;
    });
    return counts;
  }, [tasks]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-primary p-2">
              <CheckSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TaskFlow</h1>
          </div>
          <p className="text-muted-foreground">
            Stay organized and boost your productivity
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <AddTaskForm onAdd={addTask} />
            
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
            
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProgressStats tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
