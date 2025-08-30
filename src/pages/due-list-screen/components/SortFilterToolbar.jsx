import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SortFilterToolbar = ({ onSortChange, onFilterChange, currentSort, currentFilter }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const sortOptions = [
    { value: 'highest_amount', label: 'সর্বোচ্চ পরিমাণ', labelEn: 'Highest Amount', icon: 'TrendingUp' },
    { value: 'oldest_due', label: 'পুরাতন বকেয়া', labelEn: 'Oldest Due', icon: 'Clock' },
    { value: 'recent_activity', label: 'সাম্প্রতিক কার্যকলাপ', labelEn: 'Recent Activity', icon: 'Activity' },
    { value: 'alphabetical', label: 'নাম অনুসারে', labelEn: 'Alphabetical', icon: 'AlphabeticalSort' }
  ];

  const filterOptions = [
    { value: 'all', label: 'সকল', labelEn: 'All', icon: 'Users' },
    { value: 'customers', label: 'গ্রাহক', labelEn: 'Customers', icon: 'User' },
    { value: 'suppliers', label: 'সরবরাহকারী', labelEn: 'Suppliers', icon: 'Truck' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === currentSort);
    return option ? option?.label : 'সর্ট করুন';
  };

  const getCurrentFilterLabel = () => {
    const option = filterOptions?.find(opt => opt?.value === currentFilter);
    return option ? option?.label : 'ফিল্টার';
  };

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between space-x-3">
        {/* Sort Dropdown */}
        <div className="relative flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowSortMenu(!showSortMenu);
              setShowFilterMenu(false);
            }}
            iconName="ArrowUpDown"
            iconPosition="left"
            iconSize={16}
            className="w-full justify-between bangla-text"
          >
            {getCurrentSortLabel()}
            <Icon name="ChevronDown" size={16} />
          </Button>

          {showSortMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
              <div className="py-1">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => {
                      onSortChange(option?.value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors bangla-text ${
                      currentSort === option?.value ? 'bg-muted text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} className="mr-3" />
                    <div className="flex flex-col items-start">
                      <span>{option?.label}</span>
                      <span className="text-xs opacity-75">{option?.labelEn}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
              setShowSortMenu(false);
            }}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
            className="w-full justify-between bangla-text"
          >
            {getCurrentFilterLabel()}
            <Icon name="ChevronDown" size={16} />
          </Button>

          {showFilterMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
              <div className="py-1">
                {filterOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => {
                      onFilterChange(option?.value);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm hover:bg-muted transition-colors bangla-text ${
                      currentFilter === option?.value ? 'bg-muted text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} className="mr-3" />
                    <div className="flex flex-col items-start">
                      <span>{option?.label}</span>
                      <span className="text-xs opacity-75">{option?.labelEn}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreVertical"
          iconSize={16}
          className="touch-target"
        />
      </div>
      {/* Overlay */}
      {(showSortMenu || showFilterMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSortMenu(false);
            setShowFilterMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default SortFilterToolbar;