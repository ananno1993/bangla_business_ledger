import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const ContactSelector = ({ selectedContacts, onContactsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  // Mock contacts data
  const mockContacts = [
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      nameEn: 'Rahim Uddin',
      phone: '০১৭১২৩৪৫৬৭৮',
      type: 'customer',
      balance: 5000,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      nameEn: 'Fatema Khatun',
      phone: '০১৮৮৭৬৫৪৩২১',
      type: 'supplier',
      balance: -3000,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      name: 'করিম মিয়া',
      nameEn: 'Karim Mia',
      phone: '০১৯৯৮৮৭৭৬৬',
      type: 'customer',
      balance: 2500,
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 4,
      name: 'সালমা বেগম',
      nameEn: 'Salma Begum',
      phone: '০১৫৫৫৪৪৩৩২২',
      type: 'customer',
      balance: 1200,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 5,
      name: 'আব্দুল হক',
      nameEn: 'Abdul Haque',
      phone: '০১৬৬৬৫৫৫৪৪৪',
      type: 'supplier',
      balance: -800,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

  const filteredContacts = mockContacts?.filter(contact =>
    contact?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    contact?.nameEn?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    contact?.phone?.includes(searchTerm)
  );

  const handleContactToggle = (contactId) => {
    const updatedContacts = selectedContacts?.includes(contactId)
      ? selectedContacts?.filter(id => id !== contactId)
      : [...selectedContacts, contactId];
    
    onContactsChange(updatedContacts);
    setSelectAll(updatedContacts?.length === filteredContacts?.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      onContactsChange([]);
      setSelectAll(false);
    } else {
      const allContactIds = filteredContacts?.map(contact => contact?.id);
      onContactsChange(allContactIds);
      setSelectAll(true);
    }
  };

  const formatBalance = (balance) => {
    const absBalance = Math.abs(balance);
    return balance >= 0 
      ? `৳${absBalance?.toLocaleString('bn-BD')} পাবো`
      : `৳${absBalance?.toLocaleString('bn-BD')} দিতে হবে`;
  };

  const getBalanceColor = (balance) => {
    return balance >= 0 ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground bangla-text">
          যোগাযোগ নির্বাচন
        </h3>
        <span className="text-sm text-muted-foreground bangla-text">
          {selectedContacts?.length} টি নির্বাচিত
        </span>
      </div>
      {/* Search Input */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="bangla-text"
        />
      </div>
      {/* Select All Checkbox */}
      <div className="mb-4">
        <Checkbox
          label="সব নির্বাচন করুন"
          checked={selectAll}
          onChange={handleSelectAll}
          className="bangla-text"
        />
      </div>
      {/* Contacts List */}
      <div className="max-h-80 overflow-y-auto space-y-2">
        {filteredContacts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
            <p className="text-muted-foreground bangla-text">কোনো যোগাযোগ পাওয়া যায়নি</p>
          </div>
        ) : (
          filteredContacts?.map((contact) => (
            <div
              key={contact?.id}
              className={`flex items-center p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted ${
                selectedContacts?.includes(contact?.id) 
                  ? 'border-primary bg-primary/5' :'border-border'
              }`}
              onClick={() => handleContactToggle(contact?.id)}
            >
              <Checkbox
                checked={selectedContacts?.includes(contact?.id)}
                onChange={() => handleContactToggle(contact?.id)}
                className="mr-3"
              />
              
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="User" size={20} color="var(--color-muted-foreground)" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground bangla-text truncate">
                        {contact?.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact?.nameEn} • {contact?.phone}
                      </p>
                    </div>
                    
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className={`text-sm font-medium bangla-text ${getBalanceColor(contact?.balance)}`}>
                        {formatBalance(contact?.balance)}
                      </p>
                      <div className="flex items-center">
                        <Icon 
                          name={contact?.type === 'customer' ? 'User' : 'Truck'} 
                          size={12} 
                          className="mr-1" 
                        />
                        <span className="text-xs text-muted-foreground bangla-text">
                          {contact?.type === 'customer' ? 'গ্রাহক' : 'সরবরাহকারী'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Selected Contacts Summary */}
      {selectedContacts?.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground bangla-text">
            {selectedContacts?.length} টি যোগাযোগ নির্বাচিত হয়েছে
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactSelector;