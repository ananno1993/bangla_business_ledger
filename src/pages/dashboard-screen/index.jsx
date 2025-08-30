import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SummaryCard from './components/SummaryCard';
import TransactionItem from './components/TransactionItem';
import QuickActionButton from './components/QuickActionButton';
import OfflineIndicator from './components/OfflineIndicator';
import EmptyState from './components/EmptyState';
import DetailModal from './components/DetailModal';
import FloatingActionButton from './components/FloatingActionButton';
import Icon from '../../components/AppIcon';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for dashboard
  const mockSummaryData = {
    totalReceivables: 45750,
    totalPayables: 12300,
    todayTransactions: 8950
  };

  const mockRecentTransactions = [
    {
      id: 1,
      contactName: "রহিম উদ্দিন",
      amount: 2500,
      type: "পেলাম",
      date: new Date(Date.now() - 1800000), // 30 minutes ago
      note: "চালের বিল"
    },
    {
      id: 2,
      contactName: "ফাতেমা খাতুন",
      amount: 1200,
      type: "দিলাম",
      date: new Date(Date.now() - 3600000), // 1 hour ago
      note: "দোকানের ভাড়া"
    },
    {
      id: 3,
      contactName: "করিম মিয়া",
      amount: 3200,
      type: "পেলাম",
      date: new Date(Date.now() - 7200000), // 2 hours ago
      note: "মুদি মাল"
    },
    {
      id: 4,
      contactName: "সালমা বেগম",
      amount: 850,
      type: "পেলাম",
      date: new Date(Date.now() - 10800000), // 3 hours ago
      note: "চা পাতা"
    },
    {
      id: 5,
      contactName: "আব্দুল হক",
      amount: 1500,
      type: "দিলাম",
      date: new Date(Date.now() - 14400000), // 4 hours ago
      note: "পরিবহন খরচ"
    }
  ];

  const mockDetailData = {
    receivables: [
      { label: "এই সপ্তাহে", amount: 15750, icon: "Calendar" },
      { label: "এই মাসে", amount: 45750, icon: "CalendarDays" },
      { label: "মোট গ্রাহক", amount: 23, icon: "Users" }
    ],
    payables: [
      { label: "এই সপ্তাহে", amount: 4300, icon: "Calendar" },
      { label: "এই মাসে", amount: 12300, icon: "CalendarDays" },
      { label: "মোট সরবরাহকারী", amount: 8, icon: "Truck" }
    ],
    today: [
      { label: "পেলাম", amount: 6350, icon: "ArrowDownLeft" },
      { label: "দিলাম", amount: 2600, icon: "ArrowUpRight" },
      { label: "মোট লেনদেন", amount: 12, icon: "Receipt" }
    ]
  };

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastUpdated(new Date());
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Transaction actions
  const handleEditTransaction = (transaction) => {
    navigate('/transaction-entry-screen', { 
      state: { editTransaction: transaction } 
    });
  };

  const handleDeleteTransaction = (transaction) => {
    // In real app, this would show confirmation dialog
    console.log('Delete transaction:', transaction?.id);
  };

  const handleDuplicateTransaction = (transaction) => {
    navigate('/transaction-entry-screen', { 
      state: { duplicateTransaction: transaction } 
    });
  };

  // Modal handlers
  const handleCardClick = (type) => {
    setSelectedModal(type);
  };

  const closeModal = () => {
    setSelectedModal(null);
  };

  // Quick actions
  const handleAddTransaction = () => {
    navigate('/transaction-entry-screen');
  };

  const handleSendReminder = () => {
    navigate('/due-list-screen');
  };

  const handleViewDueList = () => {
    navigate('/due-list-screen');
  };

  const getModalData = () => {
    switch (selectedModal) {
      case 'receivables':
        return { title: 'পাওনার বিস্তারিত', data: mockDetailData?.receivables };
      case 'payables':
        return { title: 'দেনার বিস্তারিত', data: mockDetailData?.payables };
      case 'today':
        return { title: 'আজকের লেনদেনের বিস্তারিত', data: mockDetailData?.today };
      default:
        return { title: '', data: [] };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20">
        {/* Status Bar */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <OfflineIndicator isOnline={isOnline} lastUpdated={lastUpdated} />
        </div>

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4 bg-muted/50">
            <Icon name="RefreshCw" size={20} className="animate-spin text-primary mr-2" />
            <span className="text-sm text-foreground bangla-text">আপডেট হচ্ছে...</span>
          </div>
        )}

        <div className="p-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4">
            <SummaryCard
              title="মোট পাওনা"
              amount={mockSummaryData?.totalReceivables}
              type="receivable"
              onClick={() => handleCardClick('receivables')}
            />
            <SummaryCard
              title="মোট দেনা"
              amount={mockSummaryData?.totalPayables}
              type="payable"
              onClick={() => handleCardClick('payables')}
            />
            <SummaryCard
              title="আজকের লেনদেন"
              amount={mockSummaryData?.todayTransactions}
              type="today"
              onClick={() => handleCardClick('today')}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-3">
            <h2 className="text-lg font-semibold text-foreground bangla-text">
              দ্রুত কাজ
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton
                title="লেনদেন যোগ করুন"
                iconName="Plus"
                onClick={handleAddTransaction}
                variant="default"
              />
              <QuickActionButton
                title="রিমাইন্ডার পাঠান"
                iconName="MessageCircle"
                onClick={handleSendReminder}
                variant="outline"
              />
            </div>
            <QuickActionButton
              title="বকেয়া তালিকা দেখুন"
              iconName="Clock"
              onClick={handleViewDueList}
              variant="outline"
            />
          </div>

          {/* Recent Transactions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground bangla-text">
                সাম্প্রতিক লেনদেন
              </h2>
              <button
                onClick={handleRefresh}
                className="p-2 hover:bg-muted rounded-full transition-colors touch-target"
                disabled={isRefreshing}
              >
                <Icon 
                  name="RefreshCw" 
                  size={18} 
                  className={`text-muted-foreground ${isRefreshing ? 'animate-spin' : ''}`} 
                />
              </button>
            </div>

            {mockRecentTransactions?.length === 0 ? (
              <EmptyState onAddTransaction={handleAddTransaction} />
            ) : (
              <div className="space-y-3">
                {mockRecentTransactions?.map((transaction) => (
                  <TransactionItem
                    key={transaction?.id}
                    transaction={transaction}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                    onDuplicate={handleDuplicateTransaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton />
      {/* Detail Modal */}
      <DetailModal
        isOpen={selectedModal !== null}
        onClose={closeModal}
        title={getModalData()?.title}
        data={getModalData()?.data}
      />
    </div>
  );
};

export default DashboardScreen;