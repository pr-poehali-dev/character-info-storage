
import React from 'react';
import { CharacterFormData } from '@/types/character';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { CharacterBasicInfo } from './CharacterBasicInfo';
import { CharacterDescription } from './CharacterDescription';
import { CharacterAvatar } from './CharacterAvatar';
import { CharacterAbilities } from './CharacterAbilities';
import { CharacterRelationships } from './CharacterRelationships';
import { useCharacterForm } from './useCharacterForm';

interface CharacterFormProps {
  onSubmit: (data: CharacterFormData) => void;
  onCancel: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, onCancel }) => {
  const {
    formData,
    previewUrl,
    handleChange,
    generateRandomAvatar,
    // Abilities
    newAbility,
    setNewAbility,
    addAbility,
    removeAbility,
    // Relationships
    newRelationship,
    setNewRelationship,
    addRelationship,
    removeRelationship,
    // Submit
    handleSubmit,
  } = useCharacterForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <CharacterAvatar 
            avatar={formData.avatar}
            previewUrl={previewUrl}
            onChange={handleChange}
            onGenerateRandom={generateRandomAvatar}
          />
          
          <CharacterAbilities 
            abilities={formData.abilities || []}
            newAbility={newAbility}
            onNewAbilityChange={setNewAbility}
            onAddAbility={addAbility}
            onRemoveAbility={removeAbility}
          />
          
          <CharacterRelationships
            relationships={formData.relationships || []}
            newRelationship={newRelationship}
            onNewRelationshipChange={setNewRelationship}
            onAddRelationship={addRelationship}
            onRemoveRelationship={removeRelationship}
          />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <CharacterBasicInfo
            name={formData.name}
            race={formData.race || ''}
            characterClass={formData.class || ''}
            universe={formData.universe || ''}
            onChange={handleChange}
          />
          
          <CharacterDescription
            backstory={formData.backstory || ''}
            appearance={formData.appearance || ''}
            personality={formData.personality || ''}
            notes={formData.notes || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Icon name="Save" className="mr-2 h-4 w-4" />
          Сохранить персонажа
        </Button>
      </div>
    </form>
  );
};

export default CharacterForm;
