import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, onClear }) => {
  return (
    <div className="px-4 py-3 bg-background border-b border-border">
      <div className="relative">
        <Input
          type="search"
          placeholder="গ্রাহক বা সরবরাহকারীর নাম খুঁজুন..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-10 pr-10 bangla-text"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;