import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import DueListHeader from './components/DueListHeader';
import SortFilterToolbar from './components/SortFilterToolbar';
import SearchBar from './components/SearchBar';
import DueContactCard from './components/DueContactCard';
import EmptyState from './components/EmptyState';
import BulkActionsSheet from './components/BulkActionsSheet';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const DueListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('highest_amount');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for due contacts
  const [dueContacts] = useState([
    {
      id: 1,
      name: 'মোহাম্মদ রহিম উদ্দিন',
      phone: '+8801712345678',
      type: 'customer',
      dueAmount: 75000,
      lastTransactionDate: '2025-08-15',
      reminderHistory: [
        {
          id: 1,
          type: 'gentle',
          sentAt: '2025-08-25',
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      phone: '+8801823456789',
      type: 'customer',
      dueAmount: 45000,
      lastTransactionDate: '2025-08-10',
      reminderHistory: []
    },
    {
      id: 3,
      name: 'আব্দুল করিম ট্রেডার্স',
      phone: '+8801934567890',
      type: 'supplier',
      dueAmount: 120000,
      lastTransactionDate: '2025-08-05',
      reminderHistory: [
        {
          id: 2,
          type: 'urgent',
          sentAt: '2025-08-20',
          status: 'sent'
        }
      ]
    },
    {
      id: 4,
      name: 'সালমা বেগম',
      phone: '+8801645678901',
      type: 'customer',
      dueAmount: 25000,
      lastTransactionDate: '2025-08-18',
      reminderHistory: []
    },
    {
      id: 5,
      name: 'হাসান এন্টারপ্রাইজ',
      phone: '+8801756789012',
      type: 'supplier',
      dueAmount: 85000,
      lastTransactionDate: '2025-08-12',
      reminderHistory: [
        {
          id: 3,
          type: 'final',
          sentAt: '2025-08-26',
          status: 'delivered'
        }
      ]
    },
    {
      id: 6,
      name: 'নাসির আহমেদ',
      phone: '+8801867890123',
      type: 'customer',
      dueAmount: 15000,
      lastTransactionDate: '2025-08-20',
      reminderHistory: []
    }
  ]);

  // Filter and sort contacts
  const getFilteredAndSortedContacts = () => {
    let filtered = dueContacts;

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(contact =>
        contact?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply type filter
    if (filterBy !== 'all') {
      filtered = filtered?.filter(contact => {
        if (filterBy === 'customers') return contact?.type === 'customer';
        if (filterBy === 'suppliers') return contact?.type === 'supplier';
        return true;
      });
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'highest_amount':
          return b?.dueAmount - a?.dueAmount;
        case 'oldest_due':
          return new Date(a.lastTransactionDate) - new Date(b.lastTransactionDate);
        case 'recent_activity':
          return new Date(b.lastTransactionDate) - new Date(a.lastTransactionDate);
        case 'alphabetical':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredContacts = getFilteredAndSortedContacts();
  const totalOutstanding = dueContacts?.reduce((sum, contact) => sum + contact?.dueAmount, 0);

  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = (phoneNumber) => {
    const cleanNumber = phoneNumber?.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const handleSendReminder = (contact, template) => {
    console.log('Sending reminder:', { contact, template });
    // Here you would integrate with SMS/WhatsApp API
    alert(`রিমাইন্ডার পাঠানো হয়েছে ${contact?.name} এর কাছে`);
  };

  const handleSelectContact = (contactId) => {
    setSelectedContacts(prev => {
      if (prev?.includes(contactId)) {
        return prev?.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExportDueList = () => {
    console.log('Exporting due list...');
    alert('বকেয়া তালিকা এক্সপোর্ট করা হচ্ছে...');
  };

  const handlePrintSummary = () => {
    console.log('Printing summary...');
    alert('সারসংক্ষেপ প্রিন্ট করা হচ্ছে...');
  };

  const handleSendGroupMessage = () => {
    console.log('Sending group message...');
    alert(`${selectedContacts?.length} জনকে গ্রুপ মেসেজ পাঠানো হচ্ছে...`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Pull to refresh handler
  const handlePullToRefresh = () => {
    handleRefresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        {/* Due List Header */}
        <DueListHeader 
          totalOutstanding={totalOutstanding}
          contactsCount={dueContacts?.length}
        />

        {/* Sort & Filter Toolbar */}
        <SortFilterToolbar
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          currentSort={sortBy}
          currentFilter={filterBy}
        />

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={clearSearch}
        />

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <Icon name="RefreshCw" size={20} className="animate-spin text-primary mr-2" />
            <span className="text-sm text-muted-foreground bangla-text">
              আপডেট করা হচ্ছে...
            </span>
          </div>
        )}

        {/* Contact List */}
        <div className="px-4 py-4">
          {filteredContacts?.length === 0 ? (
            <EmptyState onRefresh={handleRefresh} />
          ) : (
            <div className="space-y-3">
              {filteredContacts?.map((contact) => (
                <DueContactCard
                  key={contact?.id}
                  contact={contact}
                  onCall={handleCall}
                  onWhatsApp={handleWhatsApp}
                  onSendReminder={handleSendReminder}
                  onSelect={handleSelectContact}
                  isSelected={selectedContacts?.includes(contact?.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      {/* Floating Action Button for Bulk Actions */}
      {selectedContacts?.length > 0 && (
        <div className="fixed bottom-6 right-4 z-40">
          <Button
            variant="default"
            size="lg"
            onClick={() => setShowBulkActions(true)}
            iconName="Settings"
            iconPosition="left"
            iconSize={20}
            className="shadow-lg bangla-text"
          >
            {selectedContacts?.length} টি নির্বাচিত
          </Button>
        </div>
      )}
      {/* Bulk Actions Bottom Sheet */}
      <BulkActionsSheet
        isOpen={showBulkActions}
        onClose={() => setShowBulkActions(false)}
        selectedCount={selectedContacts?.length}
        onExportDueList={handleExportDueList}
        onPrintSummary={handlePrintSummary}
        onSendGroupMessage={handleSendGroupMessage}
      />
    </div>
  );
};

export default DueListScreen;