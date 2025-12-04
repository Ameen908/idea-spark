import { Task, Priority } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-chart-3/20 border-chart-3',
  medium: 'bg-chart-2/20 border-chart-2',
  high: 'bg-destructive/20 border-destructive',
};

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all duration-200 hover:shadow-md',
        task.completed && 'opacity-60'
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
      </div>
      
      <span
        className={cn(
          'rounded-full border px-2.5 py-0.5 text-xs font-medium',
          priorityColors[task.priority]
        )}
      >
        {priorityLabels[task.priority]}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
