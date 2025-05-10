
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Relationship {
  name: string;
  relationship: string;
}

interface CharacterRelationshipsProps {
  relationships: Relationship[];
  newRelationship: Relationship;
  onNewRelationshipChange: (value: Relationship) => void;
  onAddRelationship: () => void;
  onRemoveRelationship: (index: number) => void;
}

export const CharacterRelationships: React.FC<CharacterRelationshipsProps> = ({
  relationships,
  newRelationship,
  onNewRelationshipChange,
  onAddRelationship,
  onRemoveRelationship
}) => {
  return (
    <div>
      <Label htmlFor="relationships">Отношения</Label>
      <div className="space-y-2 mt-1">
        <Input 
          id="relationshipName" 
          value={newRelationship.name} 
          onChange={(e) => onNewRelationshipChange({...newRelationship, name: e.target.value})} 
          placeholder="Имя"
        />
        <Input 
          id="relationshipType" 
          value={newRelationship.relationship} 
          onChange={(e) => onNewRelationshipChange({...newRelationship, relationship: e.target.value})} 
          placeholder="Тип отношений"
        />
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={onAddRelationship}
        >
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Добавить отношение
        </Button>
      </div>
      
      {relationships.length > 0 && (
        <ul className="mt-2 space-y-1">
          {relationships.map((rel, index) => (
            <li key={index} className="flex items-center justify-between bg-accent/30 rounded-md py-1 px-2 text-sm">
              <span>
                <span className="font-medium">{rel.name}</span>: {rel.relationship}
              </span>
              <button 
                type="button" 
                onClick={() => onRemoveRelationship(index)}
                className="text-muted-foreground hover:text-destructive ml-2"
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
