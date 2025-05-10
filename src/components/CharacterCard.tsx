
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const getDefaultAvatar = () => {
    return `https://source.unsplash.com/random/300x300/?portrait,fantasy&sig=${character.id}`;
  };

  return (
    <Card className="character-card overflow-hidden border border-border/40 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={character.avatar || getDefaultAvatar()} 
          alt={character.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-playfair text-xl font-semibold line-clamp-1">{character.name}</h3>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {character.race && (
            <Badge variant="outline" className="text-xs">
              {character.race}
            </Badge>
          )}
          {character.class && (
            <Badge variant="outline" className="text-xs bg-accent/30 text-secondary">
              {character.class}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        {character.universe && (
          <div className="text-sm text-muted-foreground mb-2">
            <span className="font-medium">Вселенная:</span> {character.universe}
          </div>
        )}
        
        {character.backstory && (
          <p className="text-sm line-clamp-3 text-muted-foreground">
            {character.backstory}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onView(character.id)}
        >
          <Icon name="Eye" className="mr-1 h-4 w-4" />
          Просмотр
        </Button>
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(character.id)}
          >
            <Icon name="Pencil" className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(character.id)}
          >
            <Icon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
