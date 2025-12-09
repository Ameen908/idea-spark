import { useState } from 'react';
import { format } from 'date-fns';
import { Priority, Category, CATEGORIES } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Plus, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority, category: Category, dueDate?: Date) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title.trim(), priority, category, dueDate);
    setTitle('');
    setDueDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 p-4 rounded-2xl glass animate-fade-in">
      <Input
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 min-w-[200px] rounded-xl bg-background/50 backdrop-blur-sm border-border/50 focus:bg-background/80 transition-all duration-300"
      />
      
      <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
        <SelectTrigger className="w-32 rounded-xl glass-pill border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
        <SelectTrigger className="w-28 rounded-xl glass-pill border-border/50">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              'w-36 justify-start text-left font-normal rounded-xl glass-pill border-border/50 hover:scale-102 transition-all duration-300',
              !dueDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dueDate ? format(dueDate, 'MMM d') : 'Due date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={setDueDate}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <Button type="submit" disabled={!title.trim()} className="rounded-xl hover:scale-105 transition-all duration-300">
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}
