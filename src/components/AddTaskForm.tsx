import { useState } from 'react';
import { Priority } from '@/types/task';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title.trim(), priority);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      
      <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
      
      <Button type="submit" disabled={!title.trim()}>
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  );
}
