import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  };

  const formatDateBangla = (date) => {
    const banglaMonths = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    const day = date?.getDate()?.toString()?.replace(/\d/g, d => banglaDigits?.[d]);
    const month = banglaMonths?.[date?.getMonth()];
    const year = date?.getFullYear()?.toString()?.replace(/\d/g, d => banglaDigits?.[d]);
    
    return `${day} ${month}, ${year}`;
  };

  const getDateShortcuts = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);
    
    const lastWeek = new Date(today);
    lastWeek?.setDate(lastWeek?.getDate() - 7);

    return [
      { label: 'আজ', labelEn: 'Today', date: today },
      { label: 'গতকাল', labelEn: 'Yesterday', date: yesterday },
      { label: 'গত ৭ দিন', labelEn: 'Last 7 Days', date: lastWeek }
    ];
  };

  const handleDateSelect = (date) => {
    onDateChange(date);
    setIsOpen(false);
  };

  const handleDateInputChange = (e) => {
    const dateValue = e?.target?.value;
    if (dateValue) {
      const date = new Date(dateValue);
      onDateChange(date);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
        তারিখ
      </label>
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={() => setIsOpen(true)}
        className="justify-between h-12 text-left"
      >
        <div>
          <p className="font-medium text-foreground">{formatDate(selectedDate)}</p>
          <p className="text-sm text-muted-foreground bangla-text">
            {formatDateBangla(selectedDate)}
          </p>
        </div>
        <Icon name="Calendar" size={20} />
      </Button>
      {/* Date Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-card w-full rounded-t-xl border-t border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold bangla-text">তারিখ নির্বাচন</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4">
              {/* Date Shortcuts */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 bangla-text">
                  দ্রুত নির্বাচন
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {getDateShortcuts()?.map((shortcut, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDateSelect(shortcut?.date)}
                      className="bangla-text"
                    >
                      {shortcut?.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Manual Date Input */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 bangla-text">
                  নির্দিষ্ট তারিখ
                </h4>
                <Input
                  type="date"
                  value={selectedDate?.toISOString()?.split('T')?.[0]}
                  onChange={handleDateInputChange}
                  className="w-full"
                />
              </div>

              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={() => setIsOpen(false)}
                className="bangla-text"
              >
                সম্পন্ন
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;