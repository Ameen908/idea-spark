import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableTaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => Promise<boolean>;
}

export function SortableTaskCard({ task, onToggle, onDelete, onUpdate }: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: task.completed });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group/drag',
        isDragging && 'z-50 opacity-90 scale-105'
      )}
    >
      {!task.completed && (
        <div
          {...attributes}
          {...listeners}
          className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/drag:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10 glass-icon rounded-lg p-1"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <TaskCard
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
}
