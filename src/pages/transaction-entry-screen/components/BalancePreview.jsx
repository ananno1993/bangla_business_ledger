import React from 'react';
import Icon from '../../../components/AppIcon';

const BalancePreview = ({ selectedContact, transactionType, amount }) => {
  if (!selectedContact || !amount) return null;

  const currentBalance = selectedContact?.balance;
  const transactionAmount = parseFloat(amount) || 0;
  
  let newBalance;
  if (transactionType === 'received') {
    newBalance = currentBalance + transactionAmount;
  } else {
    newBalance = currentBalance - transactionAmount;
  }

  const formatBanglaNumber = (num) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return Math.abs(num)?.toLocaleString('bn-BD')?.replace(/\d/g, (digit) => banglaDigits?.[parseInt(digit)]);
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
      <div className="flex items-center mb-3">
        <Icon name="Calculator" size={16} className="text-primary mr-2" />
        <h3 className="text-sm font-medium text-foreground bangla-text">
          ব্যালেন্স পূর্বাভাস
        </h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground bangla-text">বর্তমান ব্যালেন্স:</span>
          <span className={`text-sm font-medium ${
            currentBalance >= 0 ? 'text-success' : 'text-error'
          }`}>
            ৳{formatBanglaNumber(currentBalance)} {currentBalance >= 0 ? '(পাবো)' : '(দিতে হবে)'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground bangla-text">
            {transactionType === 'received' ? 'পেলাম:' : 'দিলাম:'}
          </span>
          <span className={`text-sm font-medium ${
            transactionType === 'received' ? 'text-success' : 'text-error'
          }`}>
            {transactionType === 'received' ? '+' : '-'}৳{formatBanglaNumber(transactionAmount)}
          </span>
        </div>
        
        <div className="border-t border-border pt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground bangla-text">নতুন ব্যালেন্স:</span>
            <span className={`text-sm font-semibold ${
              newBalance >= 0 ? 'text-success' : 'text-error'
            }`}>
              ৳{formatBanglaNumber(newBalance)} {newBalance >= 0 ? '(পাবো)' : '(দিতে হবে)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancePreview;