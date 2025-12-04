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
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-card-foreground">Today's Progress</h3>
        <span className="text-2xl font-bold text-primary">{percentage}%</span>
      </div>
      
      <Progress value={percentage} className="h-2" />
      
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Circle className="h-4 w-4" />
            <span className="text-sm">Total</span>
          </div>
          <p className="text-xl font-semibold text-card-foreground">{total}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-primary">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm">Done</span>
          </div>
          <p className="text-xl font-semibold text-card-foreground">{completed}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-destructive">
            <Flame className="h-4 w-4" />
            <span className="text-sm">Urgent</span>
          </div>
          <p className="text-xl font-semibold text-card-foreground">{highPriority}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Overdue</span>
          </div>
          <p className="text-xl font-semibold text-card-foreground">{overdue}</p>
        </div>
      </div>
    </div>
  );
}
