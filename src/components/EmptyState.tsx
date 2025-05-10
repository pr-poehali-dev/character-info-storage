
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Персонажи не найдены",
  description = "У вас пока нет созданных персонажей. Начните создавать свою коллекцию прямо сейчас!",
  icon = "Users",
  actionLabel = "Создать персонажа",
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-accent/30 p-4 rounded-full mb-4">
        <Icon name={icon} className="h-12 w-12 text-primary" />
      </div>
      
      <h3 className="text-2xl font-playfair font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      
      {onAction && (
        <Button onClick={onAction} className="bg-primary hover:bg-primary/90">
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
