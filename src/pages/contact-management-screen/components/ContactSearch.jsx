import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactSearch = ({ onSearch, onSortChange, sortBy, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { key: 'name', label: 'নাম অনুসারে', labelEn: 'By Name' },
    { key: 'balance', label: 'ব্যালেন্স অনুসারে', labelEn: 'By Balance' },
    { key: 'lastTransaction', label: 'শেষ লেনদেন অনুসারে', labelEn: 'By Last Transaction' },
    { key: 'totalTransactions', label: 'মোট লেনদেন অনুসারে', labelEn: 'By Total Transactions' }
  ];

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleSortSelect = (sortKey) => {
    const newOrder = sortBy === sortKey && sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortKey, newOrder);
    setShowSortMenu(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.key === sortBy);
    return option ? option?.label : 'নাম অনুসারে';
  };

  return (
    <div className="space-y-3 mb-4">
      {/* Search Input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pl-10 bangla-text"
        />
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSortMenu(!showSortMenu)}
            iconName="ArrowUpDown"
            iconPosition="left"
            iconSize={14}
            className="bangla-text"
          >
            {getCurrentSortLabel()}
            <Icon 
              name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
              size={14} 
              className="ml-1" 
            />
          </Button>

          {showSortMenu && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-50">
              <div className="py-1">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.key}
                    onClick={() => handleSortSelect(option?.key)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-muted transition-colors bangla-text ${
                      sortBy === option?.key ? 'bg-muted text-primary' : 'text-foreground'
                    }`}
                  >
                    <span className="hidden sm:inline">{option?.label}</span>
                    <span className="sm:hidden">{option?.labelEn}</span>
                    {sortBy === option?.key && (
                      <Icon 
                        name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
                        size={14} 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground bangla-text">
          {searchTerm && `"${searchTerm}" এর জন্য ফলাফল`}
        </div>
      </div>
      {/* Overlay for sort menu */}
      {showSortMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSortMenu(false)}
        />
      )}
    </div>
  );
};

export default ContactSearch;