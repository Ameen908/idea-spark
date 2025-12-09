import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/contexts/AuthContext';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { ProgressStats } from '@/components/ProgressStats';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Button } from '@/components/ui/button';
import { CheckSquare, LogOut, Loader2 } from 'lucide-react';
import { Category } from '@/types/task';
const Index = () => {
  const {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask
  } = useTasks();
  const {
    user,
    loading: authLoading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);
  const filteredTasks = useMemo(() => {
    if (selectedCategory === 'all') return tasks;
    return tasks.filter(task => task.category === selectedCategory);
  }, [tasks, selectedCategory]);
  const categoryCounts = useMemo(() => {
    const counts: Record<Category | 'all', number> = {
      all: tasks.length,
      work: 0,
      personal: 0,
      shopping: 0,
      health: 0,
      other: 0
    };
    tasks.forEach(task => {
      counts[task.category]++;
    });
    return counts;
  }, [tasks]);
  if (authLoading || loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>;
  }
  if (!user) return null;
  return <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2">
                <CheckSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Maestro TaskFlow</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {user.email}
          </p>
        </header>

        <div className="space-y-6">
          <ProgressStats tasks={tasks} />
          
          <AddTaskForm onAdd={addTask} />
          
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} counts={categoryCounts} />
          
          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </div>;
};
export default Index;