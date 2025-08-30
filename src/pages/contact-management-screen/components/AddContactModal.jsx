import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const AddContactModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'customer',
    openingBalance: 0,
    balanceType: 'receivable', // receivable or payable
    isPriority: false,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'নাম আবশ্যক';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'ফোন নম্বর আবশ্যক';
    } else if (!/^(\+88)?01[3-9]\d{8}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'সঠিক ফোন নম্বর দিন';
    }

    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'সঠিক ইমেইল ঠিকানা দিন';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const contactData = {
        ...formData,
        id: Date.now()?.toString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.name}`,
        balance: formData?.balanceType === 'receivable' ? formData?.openingBalance : -formData?.openingBalance,
        totalTransactions: 0,
        lastTransactionDate: 'কোন লেনদেন নেই',
        createdAt: new Date()?.toISOString()
      };

      await onSave(contactData);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        type: 'customer',
        openingBalance: 0,
        balanceType: 'receivable',
        isPriority: false,
        notes: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground bangla-text">
            নতুন যোগাযোগ যোগ করুন
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Contact Type */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={formData?.type === 'customer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleInputChange('type', 'customer')}
              iconName="User"
              iconPosition="left"
              iconSize={16}
              className="flex-1 bangla-text"
            >
              গ্রাহক
            </Button>
            <Button
              type="button"
              variant={formData?.type === 'supplier' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleInputChange('type', 'supplier')}
              iconName="Building"
              iconPosition="left"
              iconSize={16}
              className="flex-1 bangla-text"
            >
              সরবরাহকারী
            </Button>
          </div>

          {/* Name */}
          <Input
            label="নাম *"
            type="text"
            placeholder="পূর্ণ নাম লিখুন"
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
            className="bangla-text"
          />

          {/* Phone */}
          <Input
            label="ফোন নম্বর *"
            type="tel"
            placeholder="01XXXXXXXXX"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
            className="data-text"
          />

          {/* Email */}
          <Input
            label="ইমেইল"
            type="email"
            placeholder="example@email.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            className="data-text"
          />

          {/* Address */}
          <Input
            label="ঠিকানা"
            type="text"
            placeholder="সম্পূর্ণ ঠিকানা"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            className="bangla-text"
          />

          {/* Opening Balance */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground bangla-text">
              প্রারম্ভিক ব্যালেন্স
            </label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="0"
                value={formData?.openingBalance}
                onChange={(e) => handleInputChange('openingBalance', parseFloat(e?.target?.value) || 0)}
                className="flex-1 data-text"
                min="0"
                step="0.01"
              />
              <Button
                type="button"
                variant={formData?.balanceType === 'receivable' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('balanceType', 'receivable')}
                className="bangla-text whitespace-nowrap"
              >
                পাবো
              </Button>
              <Button
                type="button"
                variant={formData?.balanceType === 'payable' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('balanceType', 'payable')}
                className="bangla-text whitespace-nowrap"
              >
                দিতে হবে
              </Button>
            </div>
          </div>

          {/* Priority Contact */}
          <Checkbox
            label="গুরুত্বপূর্ণ যোগাযোগ"
            description="এই যোগাযোগটি তালিকার উপরে দেখাবে"
            checked={formData?.isPriority}
            onChange={(e) => handleInputChange('isPriority', e?.target?.checked)}
            className="bangla-text"
          />

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground bangla-text">
              নোট
            </label>
            <textarea
              placeholder="অতিরিক্ত তথ্য..."
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring bangla-text resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bangla-text"
              disabled={isSubmitting}
            >
              বাতিল
            </Button>
            <Button
              type="submit"
              className="flex-1 bangla-text"
              loading={isSubmitting}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              যোগ করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;