import { isPast } from 'date-fns';
import { Task } from '@/types/task';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Flame, AlertTriangle } from 'lucide-react';

interface ProgressStatsProps {
  tasks: Task[];
}

export function ProgressStats({ tasks }: ProgressStatsProps) {
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
  
  const overdue = tasks.filter((t) => {
    if (t.completed || !t.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isPast(t.dueDate) && t.dueDate < today;
  }).length;

  return (
    <div className="rounded-2xl glass p-6 space-y-4 animate-blur-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-card-foreground">Today's Progress</h3>
        <span className="text-2xl font-bold text-primary animate-float">{percentage}%</span>
      </div>
      
      <Progress value={percentage} className="h-2" />
      
      <div className="grid grid-cols-4 gap-3 pt-2">
        <div className="text-center p-3 rounded-xl glass-subtle hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <div className="p-1.5 rounded-lg glass-icon">
              <Circle className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
          <p className="text-lg font-semibold text-card-foreground mt-1">{total}</p>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
        
        <div className="text-center p-3 rounded-xl glass-subtle hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-primary">
            <div className="p-1.5 rounded-lg glass-icon">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
          <p className="text-lg font-semibold text-card-foreground mt-1">{completed}</p>
          <span className="text-xs text-muted-foreground">Done</span>
        </div>
        
        <div className="text-center p-3 rounded-xl glass-subtle hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-destructive">
            <div className="p-1.5 rounded-lg bg-destructive/10 backdrop-blur-md border border-destructive/20">
              <Flame className="h-3.5 w-3.5 text-destructive" />
            </div>
          </div>
          <p className="text-lg font-semibold text-card-foreground mt-1">{highPriority}</p>
          <span className="text-xs text-muted-foreground">Urgent</span>
        </div>

        <div className="text-center p-3 rounded-xl glass-subtle hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center gap-1 text-destructive">
            <div className="p-1.5 rounded-lg bg-destructive/10 backdrop-blur-md border border-destructive/20">
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
            </div>
          </div>
          <p className="text-lg font-semibold text-card-foreground mt-1">{overdue}</p>
          <span className="text-xs text-muted-foreground">Overdue</span>
        </div>
      </div>
    </div>
  );
}
