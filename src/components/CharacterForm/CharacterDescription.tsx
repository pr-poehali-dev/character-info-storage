
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CharacterDescriptionProps {
  backstory: string;
  appearance: string;
  personality: string;
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CharacterDescription: React.FC<CharacterDescriptionProps> = ({
  backstory,
  appearance,
  personality,
  notes,
  onChange
}) => {
  return (
    <>
      <div>
        <Label htmlFor="backstory">Предыстория</Label>
        <Textarea 
          id="backstory" 
          name="backstory" 
          value={backstory} 
          onChange={onChange} 
          placeholder="Опишите историю персонажа..."
          className="mt-1 min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="appearance">Внешность</Label>
        <Textarea 
          id="appearance" 
          name="appearance" 
          value={appearance} 
          onChange={onChange} 
          placeholder="Опишите внешний вид персонажа..."
          className="mt-1 min-h-[80px]"
        />
      </div>
      
      <div>
        <Label htmlFor="personality">Личность</Label>
        <Textarea 
          id="personality" 
          name="personality" 
          value={personality} 
          onChange={onChange} 
          placeholder="Опишите характер, привычки, особенности..."
          className="mt-1 min-h-[80px]"
        />
      </div>
      
      <div>
        <Label htmlFor="notes">Заметки</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={notes} 
          onChange={onChange} 
          placeholder="Дополнительная информация, идеи, планы развития..."
          className="mt-1 min-h-[80px]"
        />
      </div>
    </>
  );
};
