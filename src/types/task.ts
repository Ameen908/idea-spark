export type Priority = 'low' | 'medium' | 'high';

export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'work', label: 'Work', color: 'bg-chart-1/20 border-chart-1 text-chart-1' },
  { value: 'personal', label: 'Personal', color: 'bg-chart-2/20 border-chart-2 text-chart-2' },
  { value: 'shopping', label: 'Shopping', color: 'bg-chart-3/20 border-chart-3 text-chart-3' },
  { value: 'health', label: 'Health', color: 'bg-chart-4/20 border-chart-4 text-chart-4' },
  { value: 'other', label: 'Other', color: 'bg-chart-5/20 border-chart-5 text-chart-5' },
];

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: Date;
}
