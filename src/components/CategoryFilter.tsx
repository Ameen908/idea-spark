import { Category, CATEGORIES } from '@/types/task';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selected: Category | 'all';
  onChange: (category: Category | 'all') => void;
  counts: Record<Category | 'all', number>;
}

export function CategoryFilter({ selected, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('all')}
        className="text-xs"
      >
        All ({counts.all})
      </Button>
      {CATEGORIES.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(cat.value)}
          className={cn('text-xs', selected !== cat.value && cat.color)}
        >
          {cat.label} ({counts[cat.value]})
        </Button>
      ))}
    </div>
  );
}
