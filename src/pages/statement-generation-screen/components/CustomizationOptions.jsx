import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationOptions = ({ options, onOptionsChange }) => {
  const customizationOptions = [
    {
      key: 'showOpeningBalance',
      label: 'প্রারম্ভিক ব্যালেন্স দেখান',
      labelEn: 'Show Opening Balance',
      description: 'স্টেটমেন্টের শুরুতে প্রারম্ভিক ব্যালেন্স প্রদর্শন করুন'
    },
    {
      key: 'showRunningTotals',
      label: 'চলমান মোট দেখান',
      labelEn: 'Show Running Totals',
      description: 'প্রতিটি লেনদেনের পর চলমান ব্যালেন্স প্রদর্শন করুন'
    },
    {
      key: 'includeTransactionNotes',
      label: 'লেনদেনের নোট অন্তর্ভুক্ত করুন',
      labelEn: 'Include Transaction Notes',
      description: 'লেনদেনের সাথে যুক্ত নোট এবং মন্তব্য প্রদর্শন করুন'
    },
    {
      key: 'includeAttachedReceipts',
      label: 'সংযুক্ত রসিদ অন্তর্ভুক্ত করুন',
      labelEn: 'Include Attached Receipts',
      description: 'লেনদেনের সাথে সংযুক্ত ছবি এবং রসিদ প্রদর্শন করুন'
    },
    {
      key: 'showBusinessTerms',
      label: 'ব্যবসার শর্তাবলী দেখান',
      labelEn: 'Show Business Terms',
      description: 'স্টেটমেন্টের শেষে ব্যবসার নিয়ম ও শর্তাবলী যুক্ত করুন'
    },
    {
      key: 'includeBanglaDate',
      label: 'বাংলা তারিখ অন্তর্ভুক্ত করুন',
      labelEn: 'Include Bangla Date',
      description: 'ইংরেজি তারিখের পাশাপাশি বাংলা তারিখ প্রদর্শন করুন'
    },
    {
      key: 'showContactDetails',
      label: 'যোগাযোগের বিস্তারিত দেখান',
      labelEn: 'Show Contact Details',
      description: 'গ্রাহকের সম্পূর্ণ যোগাযোগের তথ্য প্রদর্শন করুন'
    },
    {
      key: 'includePaymentInstructions',
      label: 'পেমেন্ট নির্দেশনা অন্তর্ভুক্ত করুন',
      labelEn: 'Include Payment Instructions',
      description: 'পেমেন্টের পদ্ধতি এবং নির্দেশনা যুক্ত করুন'
    }
  ];

  const handleOptionChange = (key, checked) => {
    onOptionsChange({ ...options, [key]: checked });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 bangla-text">
        কাস্টমাইজেশন অপশন
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customizationOptions?.map((option) => (
          <div key={option?.key} className="space-y-2">
            <Checkbox
              label={option?.label}
              checked={options?.[option?.key] || false}
              onChange={(e) => handleOptionChange(option?.key, e?.target?.checked)}
              className="bangla-text"
            />
            <p className="text-xs text-muted-foreground bangla-text ml-6">
              {option?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Business Terms Input */}
      {options?.showBusinessTerms && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
            ব্যবসার শর্তাবলী
          </label>
          <textarea
            className="w-full p-3 border border-border rounded-md bg-background text-foreground bangla-text resize-none"
            rows={4}
            placeholder="আপনার ব্যবসার নিয়ম ও শর্তাবলী লিখুন..."
            value={options?.businessTerms || ''}
            onChange={(e) => handleOptionChange('businessTerms', e?.target?.value)}
          />
        </div>
      )}
      {/* Payment Instructions Input */}
      {options?.includePaymentInstructions && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
            পেমেন্ট নির্দেশনা
          </label>
          <textarea
            className="w-full p-3 border border-border rounded-md bg-background text-foreground bangla-text resize-none"
            rows={3}
            placeholder="পেমেন্টের পদ্ধতি এবং নির্দেশনা লিখুন..."
            value={options?.paymentInstructions || ''}
            onChange={(e) => handleOptionChange('paymentInstructions', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default CustomizationOptions;