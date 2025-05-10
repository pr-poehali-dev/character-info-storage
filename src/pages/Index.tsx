
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CharacterCard from '@/components/CharacterCard';
import EmptyState from '@/components/EmptyState';
import { useToast } from '@/components/ui/use-toast';
import { sampleCharacters } from '@/data/sampleCharacters';
import { Character } from '@/types/character';
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddCharacter = () => {
    toast({
      title: "Функция в разработке",
      description: "Создание новых персонажей будет доступно в следующем обновлении",
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
