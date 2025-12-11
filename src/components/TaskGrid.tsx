import { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/types/task';
import { SortableTaskCard } from './SortableTaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskGridProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => Promise<boolean>;
  onReorder?: (tasks: Task[]) => void;
}

export function TaskGrid({ tasks, onToggle, onDelete, onUpdate, onReorder }: TaskGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sort tasks: incomplete first, completed at bottom
  const sortedTasks = useMemo(() => {
    const incomplete = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);
    return [...incomplete, ...completed];
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sortedTasks.findIndex((t) => t.id === active.id);
      const newIndex = sortedTasks.findIndex((t) => t.id === over.id);
      
      // Prevent dragging completed tasks or dropping into completed section
      const activeTask = sortedTasks[oldIndex];
      const overTask = sortedTasks[newIndex];
      if (activeTask?.completed || overTask?.completed) return;

      const newOrder = arrayMove(sortedTasks, oldIndex, newIndex);
      onReorder?.(newOrder);
    }
  };

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

  const incompleteTasks = sortedTasks.filter((t) => !t.completed);
  const completedTasks = sortedTasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={incompleteTasks.map((t) => t.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incompleteTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <SortableTaskCard
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-xs text-muted-foreground font-medium px-2">
              Completed ({completedTasks.length})
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map((task) => (
              <div key={task.id} className="animate-fade-in">
                <SortableTaskCard
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
