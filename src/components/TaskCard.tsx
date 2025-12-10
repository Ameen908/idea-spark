import { useState, useRef, useEffect } from 'react';
import { format, isToday, isTomorrow, isPast, isYesterday } from 'date-fns';
import { Task, Priority, CATEGORIES } from '@/types/task';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Calendar, AlertCircle, Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => Promise<boolean>;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-muted/30 text-muted-foreground',
  medium: 'bg-chart-2/20 text-chart-2',
  high: 'bg-destructive/20 text-destructive',
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

export function TaskCard({ task, onToggle, onDelete, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const categoryInfo = CATEGORIES.find((c) => c.value === task.category);
  const overdue = task.dueDate ? isOverdue(task.dueDate, task.completed) : false;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue.trim() && editValue !== task.title) {
      const success = await onUpdate(task.id, editValue.trim());
      if (success) {
        setIsEditing(false);
      }
    } else {
      setEditValue(task.title);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        'group glass rounded-2xl p-4 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] flex flex-col h-full min-h-[160px]',
        task.completed && 'opacity-60',
        overdue && 'border-destructive/50 bg-destructive/5'
      )}
    >
      {/* Header with checkbox and actions */}
      <div className="flex items-start justify-between mb-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="h-5 w-5 mt-0.5"
        />
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {!isEditing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 text-muted-foreground hover:text-primary hover:scale-110 transition-all"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:scale-110 transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Task Title */}
      <div className="flex-1 mb-3">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 glass-subtle border-primary/30 focus:border-primary text-sm"
            />
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className="h-6 px-2 text-xs text-primary hover:bg-primary/10"
              >
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="h-6 px-2 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p
            onDoubleClick={() => !task.completed && setIsEditing(true)}
            className={cn(
              'font-medium text-card-foreground leading-snug cursor-pointer line-clamp-3',
              task.completed && 'line-through text-muted-foreground cursor-default'
            )}
          >
            {task.title}
          </p>
        )}
      </div>

      {/* Footer with badges */}
      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {task.dueDate && !isEditing && (
          <div className={cn(
            'flex items-center gap-1 glass-pill rounded-lg px-2 py-1 text-xs',
            overdue ? 'text-destructive bg-destructive/10' : 'text-muted-foreground'
          )}>
            {overdue ? (
              <AlertCircle className="h-3 w-3" />
            ) : (
              <Calendar className="h-3 w-3" />
            )}
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        )}
        
        <span
          className={cn(
            'glass-pill rounded-lg px-2 py-1 text-xs font-medium transition-all duration-300',
            categoryInfo?.color
          )}
        >
          {categoryInfo?.label}
        </span>
        
        <span
          className={cn(
            'glass-pill rounded-lg px-2 py-1 text-xs font-medium transition-all duration-300',
            priorityColors[task.priority]
          )}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>
    </div>
  );
}
