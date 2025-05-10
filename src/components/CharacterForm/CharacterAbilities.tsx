
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CharacterAbilitiesProps {
  abilities: string[];
  newAbility: string;
  onNewAbilityChange: (value: string) => void;
  onAddAbility: () => void;
  onRemoveAbility: (index: number) => void;
}

export const CharacterAbilities: React.FC<CharacterAbilitiesProps> = ({
  abilities,
  newAbility,
  onNewAbilityChange,
  onAddAbility,
  onRemoveAbility
}) => {
  return (
    <div>
      <Label htmlFor="abilities">Способности</Label>
      <div className="flex gap-2 mt-1">
        <Input 
          id="newAbility" 
          value={newAbility} 
          onChange={(e) => onNewAbilityChange(e.target.value)} 
          placeholder="Добавить способность"
        />
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={onAddAbility}
        >
          <Icon name="Plus" className="h-4 w-4" />
        </Button>
      </div>
      
      {abilities.length > 0 && (
        <ul className="mt-2 space-y-1">
          {abilities.map((ability, index) => (
            <li key={index} className="flex items-center justify-between bg-accent/30 rounded-md py-1 px-2 text-sm">
              {ability}
              <button 
                type="button" 
                onClick={() => onRemoveAbility(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Icon name="X" className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
