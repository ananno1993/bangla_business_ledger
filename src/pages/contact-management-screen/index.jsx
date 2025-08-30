import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ContactCard from './components/ContactCard';
import ContactFilters from './components/ContactFilters';
import ContactSearch from './components/ContactSearch';
import AddContactModal from './components/AddContactModal';
import BulkActionsBar from './components/BulkActionsBar';
import EmptyState from './components/EmptyState';

const ContactManagementScreen = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for contacts
  const mockContacts = [
    {
      id: '1',
      name: 'রহিম উদ্দিন',
      phone: '01712345678',
      email: 'rahim@email.com',
      address: 'ঢাকা, বাংলাদেশ',
      type: 'customer',
      balance: 5000,
      totalTransactions: 15,
      lastTransactionDate: '২৮ আগস্ট, ২০২৫',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahim',
      isPriority: true,
      notes: 'নিয়মিত গ্রাহক'
    },
    {
      id: '2',
      name: 'করিম ট্রেডার্স',
      phone: '01812345679',
      email: 'karim@traders.com',
      address: 'চট্টগ্রাম, বাংলাদেশ',
      type: 'supplier',
      balance: -3000,
      totalTransactions: 8,
      lastTransactionDate: '২৫ আগস্ট, ২০২৫',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karim',
      isPriority: false,
      notes: 'পাইকারি সরবরাহকারী'
    },
    {
      id: '3',
      name: 'ফাতেমা বেগম',
      phone: '01912345680',
      email: 'fatema@email.com',
      address: 'সিলেট, বাংলাদেশ',
      type: 'customer',
      balance: 2500,
      totalTransactions: 22,
      lastTransactionDate: '২৭ আগস্ট, ২০২৫',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatema',
      isPriority: false,
      notes: 'মাসিক পেমেন্ট'
    },
    {
      id: '4',
      name: 'আলী এন্টারপ্রাইজ',
      phone: '01612345681',
      email: 'ali@enterprise.com',
      address: 'রাজশাহী, বাংলাদেশ',
      type: 'supplier',
      balance: -1500,
      totalTransactions: 12,
      lastTransactionDate: '২৬ আগস্ট, ২০২৫',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali',
      isPriority: true,
      notes: 'দ্রুত ডেলিভারি'
    },
    {
      id: '5',
      name: 'নাসির হোসেন',
      phone: '01512345682',
      email: 'nasir@email.com',
      address: 'খুলনা, বাংলাদেশ',
      type: 'customer',
      balance: 0,
      totalTransactions: 5,
      lastTransactionDate: '২৪ আগস্ট, ২০২৫',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nasir',
      isPriority: false,
      notes: 'নতুন গ্রাহক'
    }
  ];

  // Initialize contacts
  useEffect(() => {
    setContacts(mockContacts);
  }, []);

  // Filter and search logic
  const processedContacts = useMemo(() => {
    let result = [...contacts];

    // Apply search filter
    if (searchTerm) {
      result = result?.filter(contact =>
        contact?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        contact?.phone?.includes(searchTerm) ||
        (contact?.email && contact?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case 'customers':
        result = result?.filter(contact => contact?.type === 'customer');
        break;
      case 'suppliers':
        result = result?.filter(contact => contact?.type === 'supplier');
        break;
      case 'due':
        result = result?.filter(contact => contact?.balance !== 0);
        break;
      default:
        break;
    }

    // Apply sorting
    result?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'balance':
          aValue = Math.abs(a?.balance);
          bValue = Math.abs(b?.balance);
          break;
        case 'lastTransaction':
          aValue = new Date(a.lastTransactionDate);
          bValue = new Date(b.lastTransactionDate);
          break;
        case 'totalTransactions':
          aValue = a?.totalTransactions;
          bValue = b?.totalTransactions;
          break;
        default:
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Priority contacts first
    result?.sort((a, b) => {
      if (a?.isPriority && !b?.isPriority) return -1;
      if (!a?.isPriority && b?.isPriority) return 1;
      return 0;
    });

    return result;
  }, [contacts, searchTerm, activeFilter, sortBy, sortOrder]);

  // Update filtered contacts
  useEffect(() => {
    setFilteredContacts(processedContacts);
  }, [processedContacts]);

  // Calculate filter counts
  const filterCounts = useMemo(() => {
    return {
      all: contacts?.length,
      customers: contacts?.filter(c => c?.type === 'customer')?.length,
      suppliers: contacts?.filter(c => c?.type === 'supplier')?.length,
      due: contacts?.filter(c => c?.balance !== 0)?.length
    };
  }, [contacts]);

  // Contact actions
  const handleCall = (contact) => {
    window.open(`tel:${contact?.phone}`, '_self');
  };

  const handleWhatsApp = (contact) => {
    const message = encodeURIComponent(`আসসালামু আলাইকুম ${contact?.name}, আপনার সাথে যোগাযোগ করছি।`);
    window.open(`https://wa.me/${contact?.phone?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handleViewLedger = (contact) => {
    navigate(`/transaction-entry-screen?contact=${contact?.id}`);
  };

  const handleEditContact = (contact) => {
    console.log('Edit contact:', contact);
    // TODO: Implement edit functionality
  };

  const handleDeleteContact = (contact) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে ${contact?.name} কে মুছে ফেলতে চান?`)) {
      setContacts(prev => prev?.filter(c => c?.id !== contact?.id));
      setSelectedContacts(prev => prev?.filter(id => id !== contact?.id));
    }
  };

  const handleAddContact = (contactData) => {
    setContacts(prev => [contactData, ...prev]);
  };

  // Multi-select actions
  const handleContactSelect = (contactId) => {
    setSelectedContacts(prev => {
      if (prev?.includes(contactId)) {
        return prev?.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedContacts([]);
    setIsMultiSelectMode(false);
  };

  const handleLongPress = (contactId) => {
    setIsMultiSelectMode(true);
    setSelectedContacts([contactId]);
  };

  // Bulk actions
  const handleBulkReminder = () => {
    const selectedContactsData = contacts?.filter(c => selectedContacts?.includes(c?.id));
    console.log('Send bulk reminder to:', selectedContactsData);
    // TODO: Implement bulk reminder functionality
    handleClearSelection();
  };

  const handleBulkExport = () => {
    const selectedContactsData = contacts?.filter(c => selectedContacts?.includes(c?.id));
    console.log('Export contacts:', selectedContactsData);
    // TODO: Implement export functionality
    handleClearSelection();
  };

  const handleBulkDelete = () => {
    if (window.confirm(`আপনি কি নিশ্চিত যে ${selectedContacts?.length}টি যোগাযোগ মুছে ফেলতে চান?`)) {
      setContacts(prev => prev?.filter(c => !selectedContacts?.includes(c?.id)));
      handleClearSelection();
    }
  };

  // Pull to refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  // CSV Import
  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        console.log('Import CSV file:', file);
        // TODO: Implement CSV import functionality
      }
    };
    input?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground bangla-text">
                যোগাযোগ ব্যবস্থাপনা
              </h1>
              <p className="text-muted-foreground bangla-text">
                আপনার গ্রাহক এবং সরবরাহকারীদের তথ্য পরিচালনা করুন
              </p>
            </div>
            
            {!isMultiSelectMode && (
              <Button
                onClick={() => setIsAddModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                className="bangla-text"
              >
                <span className="hidden sm:inline">নতুন যোগাযোগ</span>
                <span className="sm:hidden">যোগ করুন</span>
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <ContactSearch
              onSearch={setSearchTerm}
              onSortChange={(sort, order) => {
                setSortBy(sort);
                setSortOrder(order);
              }}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
            
            <ContactFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={filterCounts}
            />
          </div>

          {/* Multi-select Toggle */}
          {!isMultiSelectMode && contacts?.length > 0 && (
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMultiSelectMode(true)}
                iconName="CheckSquare"
                iconPosition="left"
                iconSize={16}
                className="bangla-text"
              >
                নির্বাচন করুন
              </Button>
            </div>
          )}

          {/* Contact List */}
          <div className="space-y-3">
            {filteredContacts?.length === 0 ? (
              <EmptyState
                onAddContact={() => setIsAddModalOpen(true)}
                onImportCSV={handleImportCSV}
                hasSearchTerm={!!searchTerm}
              />
            ) : (
              filteredContacts?.map((contact) => (
                <ContactCard
                  key={contact?.id}
                  contact={contact}
                  onCall={handleCall}
                  onWhatsApp={handleWhatsApp}
                  onViewLedger={handleViewLedger}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                  onSwipeLeft={() => handleCall(contact)}
                  onSwipeRight={() => handleWhatsApp(contact)}
                  isSelected={selectedContacts?.includes(contact?.id)}
                  onSelect={handleContactSelect}
                  showActions={isMultiSelectMode}
                />
              ))
            )}
          </div>

          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="flex justify-center py-4">
              <Icon name="RotateCw" size={24} className="animate-spin text-primary" />
            </div>
          )}
        </div>
      </main>
      {/* Floating Action Button */}
      {!isMultiSelectMode && contacts?.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            size="lg"
            iconName="Plus"
            iconSize={24}
            className="rounded-full w-14 h-14 shadow-lg"
          />
        </div>
      )}
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedContacts?.length}
        onClearSelection={handleClearSelection}
        onBulkReminder={handleBulkReminder}
        onBulkExport={handleBulkExport}
        onBulkDelete={handleBulkDelete}
      />
      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddContact}
      />
    </div>
  );
};

export default ContactManagementScreen;