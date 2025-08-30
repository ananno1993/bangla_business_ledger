import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';

const AmountInput = ({ amount, onAmountChange, error }) => {
  const [displayAmount, setDisplayAmount] = useState('');

  useEffect(() => {
    if (amount) {
      setDisplayAmount(amount?.toString());
    }
  }, [amount]);

  const formatBanglaNumber = (num) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num?.toString()?.replace(/\d/g, (digit) => banglaDigits?.[parseInt(digit)]);
  };

  const handleAmountChange = (e) => {
    const value = e?.target?.value;
    // Remove any non-numeric characters except decimal point
    const numericValue = value?.replace(/[^\d.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue?.split('.');
    const formattedValue = parts?.length > 2 
      ? parts?.[0] + '.' + parts?.slice(1)?.join('') 
      : numericValue;

    setDisplayAmount(formattedValue);
    onAmountChange(parseFloat(formattedValue) || 0);
  };

  const formatDisplayAmount = (value) => {
    if (!value) return '';
    const number = parseFloat(value);
    if (isNaN(number)) return value;
    return number?.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
        পরিমাণ (টাকা) *
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-primary">
          ৳
        </div>
        <Input
          type="text"
          inputMode="decimal"
          placeholder="০.০০"
          value={displayAmount}
          onChange={handleAmountChange}
          error={error}
          className="pl-8 text-lg font-semibold h-14 text-center"
        />
      </div>
      
      {displayAmount && !error && (
        <div className="mt-2 text-center">
          <p className="text-sm text-muted-foreground bangla-text">
            বাংলায়: ৳{formatBanglaNumber(formatDisplayAmount(displayAmount))}
          </p>
        </div>
      )}
    </div>
  );
};

export default AmountInput;