
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAddCharacter: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onAddCharacter }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Icon name="BookOpen" className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-playfair font-bold text-secondary">Архив Персонажей</h1>
        </Link>
        
        <div className="flex w-full sm:w-auto items-center gap-2">
          <form onSubmit={handleSearch} className="flex-1 sm:w-64">
            <div className="relative">
              <Input
                type="search"
                placeholder="Поиск персонажей..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon 
                name="Search" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              />
            </div>
          </form>
          
          <Button onClick={onAddCharacter} className="bg-primary hover:bg-primary/90">
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            <span>Создать</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
