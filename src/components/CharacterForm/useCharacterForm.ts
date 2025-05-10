
import { useState } from 'react';
import { CharacterFormData } from '@/types/character';

type Relationship = {
  name: string;
  relationship: string;
};

const initialFormData: CharacterFormData = {
  name: '',
  avatar: '',
  race: '',
  class: '',
  universe: '',
  backstory: '',
  appearance: '',
  personality: '',
  abilities: [],
  relationships: [],
  notes: ''
};

export const useCharacterForm = (onSubmit: (data: CharacterFormData) => void) => {
  const [formData, setFormData] = useState<CharacterFormData>(initialFormData);
  const [newAbility, setNewAbility] = useState('');
  const [newRelationship, setNewRelationship] = useState<Relationship>({ name: '', relationship: '' });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Обновляем превью аватара, если изменилось URL изображения
    if (name === 'avatar' && value) {
      setPreviewUrl(value);
    }
  };

  const generateRandomAvatar = () => {
    const randomSig = Math.floor(Math.random() * 1000);
    const url = `https://source.unsplash.com/random/300x300/?portrait,fantasy&sig=${randomSig}`;
    setFormData(prev => ({ ...prev, avatar: url }));
    setPreviewUrl(url);
  };

  // Abilities management
  const addAbility = () => {
    if (newAbility.trim()) {
      setFormData(prev => ({
        ...prev,
        abilities: [...(prev.abilities || []), newAbility.trim()]
      }));
      setNewAbility('');
    }
  };

  const removeAbility = (index: number) => {
    setFormData(prev => ({
      ...prev,
      abilities: prev.abilities?.filter((_, i) => i !== index)
    }));
  };

  // Relationships management
  const addRelationship = () => {
    if (newRelationship.name.trim() && newRelationship.relationship.trim()) {
      setFormData(prev => ({
        ...prev,
        relationships: [...(prev.relationships || []), { 
          name: newRelationship.name.trim(), 
          relationship: newRelationship.relationship.trim() 
        }]
      }));
      setNewRelationship({ name: '', relationship: '' });
    }
  };

  const removeRelationship = (index: number) => {
    setFormData(prev => ({
      ...prev,
      relationships: prev.relationships?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return {
    formData,
    previewUrl,
    handleChange,
    generateRandomAvatar,
    newAbility,
    setNewAbility,
    addAbility,
    removeAbility,
    newRelationship,
    setNewRelationship,
    addRelationship,
    removeRelationship,
    handleSubmit,
  };
};
