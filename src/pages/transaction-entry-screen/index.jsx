import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import TransactionTypeToggle from './components/TransactionTypeToggle';
import ContactSelector from './components/ContactSelector';
import AmountInput from './components/AmountInput';
import DatePicker from './components/DatePicker';
import NotesInput from './components/NotesInput';
import PhotoAttachment from './components/PhotoAttachment';
import BalancePreview from './components/BalancePreview';

const TransactionEntryScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Form state
  const [transactionType, setTransactionType] = useState('received');
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState(null);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // Mock contacts data
  const mockContacts = [
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      phone: '01712345678',
      balance: 5000,
      isRecent: true
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      phone: '01823456789',
      balance: -2500,
      isRecent: true
    },
    {
      id: 3,
      name: 'করিম মিয়া',
      phone: '01934567890',
      balance: 1200,
      isRecent: true
    },
    {
      id: 4,
      name: 'সালমা বেগম',
      phone: '01645678901',
      balance: -800,
      isRecent: false
    },
    {
      id: 5,
      name: 'আব্দুল কাদের',
      phone: '01756789012',
      balance: 3500,
      isRecent: false
    },
    {
      id: 6,
      name: 'রাশিদা আক্তার',
      phone: '01867890123',
      balance: 0,
      isRecent: false
    }
  ];

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('transactionDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTransactionType(draft?.transactionType || 'received');
        setAmount(draft?.amount || 0);
        setNotes(draft?.notes || '');
        if (draft?.selectedContactId) {
          const contact = mockContacts?.find(c => c?.id === draft?.selectedContactId);
          setSelectedContact(contact);
        }
        if (draft?.selectedDate) {
          setSelectedDate(new Date(draft.selectedDate));
        }
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }

    // Load last used preferences
    const lastContact = localStorage.getItem('lastSelectedContact');
    const lastTransactionType = localStorage.getItem('lastTransactionType');
    
    if (lastContact && !savedDraft) {
      try {
        const contact = JSON.parse(lastContact);
        const foundContact = mockContacts?.find(c => c?.id === contact?.id);
        if (foundContact) {
          setSelectedContact(foundContact);
        }
      } catch (error) {
        console.error('Error loading last contact:', error);
      }
    }
    
    if (lastTransactionType && !savedDraft) {
      setTransactionType(lastTransactionType);
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (selectedContact || amount || notes) {
      const draft = {
        transactionType,
        selectedContactId: selectedContact?.id,
        amount,
        selectedDate: selectedDate?.toISOString(),
        notes,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('transactionDraft', JSON.stringify(draft));
      setHasUnsavedChanges(true);
    }
  }, [transactionType, selectedContact, amount, selectedDate, notes]);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedContact) {
      newErrors.contact = 'একটি যোগাযোগ নির্বাচন করুন';
    }

    if (!amount || amount <= 0) {
      newErrors.amount = 'সঠিক পরিমাণ লিখুন';
    }

    if (amount > 1000000) {
      newErrors.amount = 'পরিমাণ ১০ লক্ষ টাকার বেশি হতে পারবে না';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save preferences
      localStorage.setItem('lastSelectedContact', JSON.stringify(selectedContact));
      localStorage.setItem('lastTransactionType', transactionType);

      // Clear draft
      localStorage.removeItem('transactionDraft');

      // Show success message (simulate haptic feedback)
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      // Navigate back with success message
      navigate('/dashboard-screen', { 
        state: { 
          message: 'লেনদেন সফলভাবে সংরক্ষিত হয়েছে',
          type: 'success'
        }
      });

    } catch (error) {
      console.error('Error saving transaction:', error);
      setErrors({ submit: 'লেনদেন সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('আপনার পরিবর্তনগুলো সংরক্ষিত হয়নি। আপনি কি নিশ্চিত যে আপনি চলে যেতে চান?');
      if (!confirmLeave) {
        return;
      }
    }
    navigate('/dashboard-screen');
  };

  const handlePhotoAttach = (photo) => {
    setAttachedPhoto(photo);
    setHasUnsavedChanges(true);
  };

  const handlePhotoRemove = () => {
    setAttachedPhoto(null);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-24">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-3"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground bangla-text">
                নতুন লেনদেন
              </h1>
              <p className="text-sm text-muted-foreground bangla-text">
                আপনার লেনদেনের তথ্য যোগ করুন
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <TransactionTypeToggle
              transactionType={transactionType}
              onToggle={setTransactionType}
            />

            <ContactSelector
              selectedContact={selectedContact}
              onContactSelect={setSelectedContact}
              contacts={mockContacts}
            />
            {errors?.contact && (
              <p className="text-sm text-error bangla-text -mt-4">{errors?.contact}</p>
            )}

            <AmountInput
              amount={amount}
              onAmountChange={setAmount}
              error={errors?.amount}
            />

            <DatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            <NotesInput
              notes={notes}
              onNotesChange={setNotes}
            />

            <PhotoAttachment
              attachedPhoto={attachedPhoto}
              onPhotoAttach={handlePhotoAttach}
              onPhotoRemove={handlePhotoRemove}
            />

            <BalancePreview
              selectedContact={selectedContact}
              transactionType={transactionType}
              amount={amount}
            />

            {errors?.submit && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <p className="text-sm text-error bangla-text">{errors?.submit}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Fixed Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="max-w-md mx-auto">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={handleSave}
            loading={isLoading}
            disabled={!selectedContact || !amount || amount <= 0}
            iconName="Save"
            iconPosition="left"
            className="bangla-text font-semibold touch-target-large"
          >
            {isLoading ? 'সংরক্ষণ করা হচ্ছে...' : 'লেনদেন সংরক্ষণ করুন'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionEntryScreen;