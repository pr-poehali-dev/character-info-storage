
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CharacterBasicInfoProps {
  name: string;
  race: string;
  characterClass: string;
  universe: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CharacterBasicInfo: React.FC<CharacterBasicInfoProps> = ({
  name,
  race,
  characterClass,
  universe,
  onChange
}) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="text-base font-medium">Имя персонажа *</Label>
        <Input 
          id="name" 
          name="name" 
          value={name} 
          onChange={onChange} 
          placeholder="Введите имя персонажа"
          className="mt-1"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="race">Раса</Label>
          <Input 
            id="race" 
            name="race" 
            value={race} 
            onChange={onChange} 
            placeholder="Эльф, человек..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="class">Класс</Label>
          <Input 
            id="class" 
            name="class" 
            value={characterClass} 
            onChange={onChange} 
            placeholder="Воин, маг..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="universe">Вселенная</Label>
          <Input 
            id="universe" 
            name="universe" 
            value={universe} 
            onChange={onChange} 
            placeholder="Мир, сеттинг..."
            className="mt-1"
          />
        </div>
      </div>
    </>
  );
};
