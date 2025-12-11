import { Category, CATEGORIES } from '@/types/task';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
  counts: Record<Category | 'all', number>;
}

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 rounded-2xl glass-subtle">
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-4 py-2 rounded-xl text-sm font-medium',
          selected === 'all'
            ? 'glass-strong text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        All ({counts.all})
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium',
            selected === cat.value
              ? 'glass-strong text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {cat.label} ({counts[cat.value]})
        </button>
      ))}
    </div>
  );
}
