import { isPast } from 'date-fns';
import { Task } from '@/types/task';
import { Progress } from '@/components/ui/progress';

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
    <div className="rounded-2xl glass p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
        <span className="text-lg font-semibold text-primary">{percentage}%</span>
      </div>
      
      <Progress value={percentage} className="h-2" />
      
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center p-2 rounded-lg glass-subtle">
          <p className="text-base font-medium text-card-foreground">{total}</p>
          <span className="text-xs text-muted-foreground">Total</span>
        </div>
        
        <div className="text-center p-2 rounded-lg glass-subtle">
          <p className="text-base font-medium text-card-foreground">{completed}</p>
          <span className="text-xs text-muted-foreground">Done</span>
        </div>
        
        <div className="text-center p-2 rounded-lg glass-subtle">
          <p className="text-base font-medium text-card-foreground">{highPriority}</p>
          <span className="text-xs text-muted-foreground">Urgent</span>
        </div>

        <div className="text-center p-2 rounded-lg glass-subtle">
          <p className="text-base font-medium text-card-foreground">{overdue}</p>
          <span className="text-xs text-muted-foreground">Overdue</span>
        </div>
      </div>
    </div>
  );
}
