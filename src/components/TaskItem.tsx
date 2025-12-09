import { format, isToday, isTomorrow, isPast, isYesterday } from 'date-fns';
import { Task, Priority, CATEGORIES } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-muted/50 border-muted text-muted-foreground',
  medium: 'bg-chart-2/20 border-chart-2 text-chart-2',
  high: 'bg-destructive/20 border-destructive text-destructive',
};

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

function formatDueDate(date: Date): string {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
}

function isOverdue(date: Date, completed: boolean): boolean {
  if (completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isPast(date) && date < today;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const categoryInfo = CATEGORIES.find((c) => c.value === task.category);
  const overdue = task.dueDate ? isOverdue(task.dueDate, task.completed) : false;

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-2xl glass p-4 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]',
        task.completed && 'opacity-60',
        overdue && 'border-destructive/50 bg-destructive/5'
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />
      
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'font-medium text-card-foreground transition-all',
            task.completed && 'line-through text-muted-foreground'
          )}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <div className={cn(
            'flex items-center gap-1 mt-1 text-xs',
            overdue ? 'text-destructive' : 'text-muted-foreground'
          )}>
            {overdue ? (
              <AlertCircle className="h-3 w-3" />
            ) : (
              <Calendar className="h-3 w-3" />
            )}
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        )}
      </div>
      
      <span
        className={cn(
          'rounded-xl glass-pill px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105',
          categoryInfo?.color
        )}
      >
        {categoryInfo?.label}
      </span>
      
      <span
        className={cn(
          'rounded-xl glass-pill px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105',
          priorityColors[task.priority]
        )}
      >
        {priorityLabels[task.priority]}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-muted-foreground hover:text-destructive hover:scale-110"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
