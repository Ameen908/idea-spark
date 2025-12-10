import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskGridProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => Promise<boolean>;
}

export function TaskGrid({ tasks, onToggle, onDelete, onUpdate }: TaskGridProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in">
        <div className="glass-icon rounded-2xl p-4 mb-4">
          <ClipboardList className="h-12 w-12 opacity-50" />
        </div>
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">Add your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
        >
          <TaskCard
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  );
}
