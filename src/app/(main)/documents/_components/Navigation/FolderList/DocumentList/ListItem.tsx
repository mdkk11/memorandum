import { type UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '@/app/(main)/documents/_components/Item';
import { cn } from '@/libs/utils';
import { Icon } from '@/ui/Icons';

/**
 * @package
 */
export const ListItem = ({ id, title, isCurrent }: { id: UniqueIdentifier; title: string; isCurrent: boolean }) => {
  const { listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  return (
    <div className={cn(isDragging && 'opacity-0', isCurrent && 'bg-primary/5')}>
      <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...listeners}>
        <Item className={cn('pl-8', isCurrent && 'font-bold', 'flex items-center gap-1')}>
          <Icon className="scale-75" type="file" />
          <span className="truncate">{title}</span>
        </Item>
      </div>
    </div>
  );
};
