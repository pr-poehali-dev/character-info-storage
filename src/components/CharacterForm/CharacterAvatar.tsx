
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CharacterAvatarProps {
  avatar: string;
  previewUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateRandom: () => void;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  avatar,
  previewUrl,
  onChange,
  onGenerateRandom
}) => {
  return (
    <>
      <div className="border border-border/40 rounded-lg overflow-hidden aspect-square bg-gray-100 flex items-center justify-center relative">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Предпросмотр аватара" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-muted-foreground text-sm text-center p-4">
            <Icon name="Image" className="w-12 h-12 mx-auto mb-2 opacity-50" />
            Предпросмотр аватара
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="avatar">URL аватара</Label>
        <div className="flex gap-2">
          <Input 
            id="avatar" 
            name="avatar" 
            value={avatar} 
            onChange={onChange} 
            placeholder="https://example.com/image.jpg"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="icon"
            onClick={onGenerateRandom}
            title="Сгенерировать случайный аватар"
          >
            <Icon name="Dices" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
