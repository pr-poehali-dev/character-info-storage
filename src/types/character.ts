
export interface Character {
  id: string;
  name: string;
  avatar: string;
  race?: string;
  class?: string;
  universe?: string;
  backstory?: string;
  appearance?: string;
  personality?: string;
  abilities?: string[];
  relationships?: {
    name: string;
    relationship: string;
  }[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CharacterFormData = Omit<Character, 'id' | 'createdAt' | 'updatedAt'>;
