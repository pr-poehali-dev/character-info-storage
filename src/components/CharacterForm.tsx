
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CharacterFormData } from '@/types/character';
import Icon from '@/components/ui/icon';

interface CharacterFormProps {
  onSubmit: (data: CharacterFormData) => void;
  onCancel: () => void;
}

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

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CharacterFormData>(initialFormData);
  const [newAbility, setNewAbility] = useState('');
  const [newRelationship, setNewRelationship] = useState({ name: '', relationship: '' });
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

  const generateRandomAvatar = () => {
    const randomSig = Math.floor(Math.random() * 1000);
    const url = `https://source.unsplash.com/random/300x300/?portrait,fantasy&sig=${randomSig}`;
    setFormData(prev => ({ ...prev, avatar: url }));
    setPreviewUrl(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
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
                value={formData.avatar} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={generateRandomAvatar}
                title="Сгенерировать случайный аватар"
              >
                <Icon name="Dices" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="abilities">Способности</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="newAbility" 
                  value={newAbility} 
                  onChange={(e) => setNewAbility(e.target.value)} 
                  placeholder="Добавить способность"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={addAbility}
                >
                  <Icon name="Plus" className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.abilities && formData.abilities.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {formData.abilities.map((ability, index) => (
                    <li key={index} className="flex items-center justify-between bg-accent/30 rounded-md py-1 px-2 text-sm">
                      {ability}
                      <button 
                        type="button" 
                        onClick={() => removeAbility(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="X" className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div>
              <Label htmlFor="relationships">Отношения</Label>
              <div className="space-y-2 mt-1">
                <Input 
                  id="relationshipName" 
                  value={newRelationship.name} 
                  onChange={(e) => setNewRelationship({...newRelationship, name: e.target.value})} 
                  placeholder="Имя"
                />
                <Input 
                  id="relationshipType" 
                  value={newRelationship.relationship} 
                  onChange={(e) => setNewRelationship({...newRelationship, relationship: e.target.value})} 
                  placeholder="Тип отношений"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={addRelationship}
                >
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Добавить отношение
                </Button>
              </div>
              
              {formData.relationships && formData.relationships.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {formData.relationships.map((rel, index) => (
                    <li key={index} className="flex items-center justify-between bg-accent/30 rounded-md py-1 px-2 text-sm">
                      <span>
                        <span className="font-medium">{rel.name}</span>: {rel.relationship}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => removeRelationship(index)}
                        className="text-muted-foreground hover:text-destructive ml-2"
                      >
                        <Icon name="X" className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <div>
            <Label htmlFor="name" className="text-base font-medium">Имя персонажа *</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
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
                value={formData.race} 
                onChange={handleChange} 
                placeholder="Эльф, человек..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="class">Класс</Label>
              <Input 
                id="class" 
                name="class" 
                value={formData.class} 
                onChange={handleChange} 
                placeholder="Воин, маг..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="universe">Вселенная</Label>
              <Input 
                id="universe" 
                name="universe" 
                value={formData.universe} 
                onChange={handleChange} 
                placeholder="Мир, сеттинг..."
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="backstory">Предыстория</Label>
            <Textarea 
              id="backstory" 
              name="backstory" 
              value={formData.backstory} 
              onChange={handleChange} 
              placeholder="Опишите историю персонажа..."
              className="mt-1 min-h-[100px]"
            />
          </div>
          
          <div>
            <Label htmlFor="appearance">Внешность</Label>
            <Textarea 
              id="appearance" 
              name="appearance" 
              value={formData.appearance} 
              onChange={handleChange} 
              placeholder="Опишите внешний вид персонажа..."
              className="mt-1 min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="personality">Личность</Label>
            <Textarea 
              id="personality" 
              name="personality" 
              value={formData.personality} 
              onChange={handleChange} 
              placeholder="Опишите характер, привычки, особенности..."
              className="mt-1 min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Заметки</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Дополнительная информация, идеи, планы развития..."
              className="mt-1 min-h-[80px]"
            />
          </div>
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
</current-code>

<pp-write filepath="src/pages/Index.tsx" partial>
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CharacterCard from '@/components/CharacterCard';
import EmptyState from '@/components/EmptyState';
import CharacterForm from '@/components/CharacterForm';
import { useToast } from '@/components/ui/use-toast';
import { sampleCharacters } from '@/data/sampleCharacters';
import { Character, CharacterFormData } from '@/types/character';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [characters, setCharacters] = useState<Character[]>(sampleCharacters);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddCharacter = () => {
    setIsAddDialogOpen(true);
  };

  const handleCreateCharacter = (formData: CharacterFormData) => {
    const newCharacter: Character = {
      ...formData,
      id: Date.now().toString(), // Генерируем простой уникальный ID
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCharacters(prev => [newCharacter, ...prev]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Персонаж создан",
      description: `Персонаж "${newCharacter.name}" был успешно добавлен в вашу коллекцию`,
    });
  };

  const handleViewCharacter = (id: string) => {
    const character = characters.find(char => char.id === id);
    if (character) {
      setSelectedCharacter(character);
      setIsViewDialogOpen(true);
    }
  };

  const handleEditCharacter = (id: string) => {
    toast({
      title: "Функция в разработке",
      description: "Редактирование персонажей будет доступно в следующем обновлении",
    });
  };

  const handleDeleteClick = (id: string) => {
    setCharacterToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (characterToDelete) {
      setCharacters(prev => prev.filter(char => char.id !== characterToDelete));
      
      toast({
        title: "Персонаж удален",
        description: "Персонаж был успешно удален из вашей коллекции",
      });
      
      setIsDeleteDialogOpen(false);
      setCharacterToDelete(null);
    }
  };

  const filteredCharacters = characters.filter(character => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      character.name.toLowerCase().includes(query) ||
      (character.race && character.race.toLowerCase().includes(query)) ||
      (character.class && character.class.toLowerCase().includes(query)) ||
      (character.universe && character.universe.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearch={handleSearch} onAddCharacter={handleAddCharacter} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-playfair font-bold text-secondary">Ваша коллекция персонажей</h2>
          <p className="text-muted-foreground">Ваши истории и герои в одном месте</p>
        </header>
        
        {filteredCharacters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onView={handleViewCharacter}
                onEdit={handleEditCharacter}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title={searchQuery ? "Персонажи не найдены" : "Нет персонажей"}
            description={searchQuery 
              ? "По вашему запросу не найдено персонажей. Попробуйте изменить параметры поиска." 
              : "У вас пока нет созданных персонажей. Начните создавать свою коллекцию прямо сейчас!"
            }
            onAction={handleAddCharacter}
          />
        )}
      </main>
      
      {/* Диалог просмотра персонажа */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        {selectedCharacter && (
          <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-playfair">{selectedCharacter.name}</DialogTitle>
              <DialogDescription>
                {selectedCharacter.race} {selectedCharacter.class && `• ${selectedCharacter.class}`}
                {selectedCharacter.universe && ` • ${selectedCharacter.universe}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden border border-border/40">
                  <img 
                    src={selectedCharacter.avatar || `https://source.unsplash.com/random/300x300/?portrait,fantasy&sig=${selectedCharacter.id}`} 
                    alt={selectedCharacter.name} 
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
                
                {selectedCharacter.abilities && selectedCharacter.abilities.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-lg mb-2">Способности</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCharacter.abilities.map((ability, index) => (
                        <li key={index} className="text-sm">{ability}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedCharacter.relationships && selectedCharacter.relationships.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-lg mb-2">Отношения</h3>
                    <ul className="space-y-2">
                      {selectedCharacter.relationships.map((rel, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{rel.name}</span>: {rel.relationship}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2 space-y-6">
                {selectedCharacter.backstory && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Предыстория</h3>
                    <p className="text-sm text-muted-foreground">{selectedCharacter.backstory}</p>
                  </div>
                )}
                
                {selectedCharacter.appearance && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Внешность</h3>
                    <p className="text-sm text-muted-foreground">{selectedCharacter.appearance}</p>
                  </div>
                )}
                
                {selectedCharacter.personality && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Личность</h3>
                    <p className="text-sm text-muted-foreground">{selectedCharacter.personality}</p>
                  </div>
                )}
                
                {selectedCharacter.notes && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Заметки</h3>
                    <p className="text-sm text-muted-foreground">{selectedCharacter.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Диалог создания персонажа */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair">Создание персонажа</DialogTitle>
            <DialogDescription>
              Заполните информацию о своем персонаже. Обязательные поля отмечены звездочкой (*).
            </DialogDescription>
          </DialogHeader>
          
          <CharacterForm 
            onSubmit={handleCreateCharacter} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Диалог подтверждения удаления */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить персонажа?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Персонаж будет удален из вашей коллекции навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
