import React from 'react';
import Button from '../../../components/ui/Button';

const ContactFilters = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    { key: 'all', label: 'সকল', labelEn: 'All', count: counts?.all },
    { key: 'customers', label: 'গ্রাহক', labelEn: 'Customers', count: counts?.customers },
    { key: 'suppliers', label: 'সরবরাহকারী', labelEn: 'Suppliers', count: counts?.suppliers },
    { key: 'due', label: 'বকেয়া', labelEn: 'Due Payments', count: counts?.due }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
      {filters?.map((filter) => (
        <Button
          key={filter?.key}
          variant={activeFilter === filter?.key ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter?.key)}
          className="whitespace-nowrap bangla-text flex-shrink-0"
        >
          <span className="hidden sm:inline">{filter?.label}</span>
          <span className="sm:hidden">{filter?.labelEn}</span>
          {filter?.count > 0 && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === filter?.key 
                ? 'bg-primary-foreground text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {filter?.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default ContactFilters;