import React from 'react';
import Icon from '../../../components/AppIcon';

const DueListHeader = ({ totalOutstanding, contactsCount }) => {
  const formatBDT = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount)?.replace('BDT', '৳');
  };

  return (
    <div className="bg-card border-b border-border px-4 py-6">
      <div className="text-center">
        <h2 className="text-sm text-muted-foreground bangla-text mb-1">
          মোট বকেয়া
        </h2>
        <div className="text-3xl font-bold text-error mb-2">
          {formatBDT(totalOutstanding)}
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span className="bangla-text">
            {contactsCount} জন গ্রাহক/সরবরাহকারী
          </span>
        </div>
      </div>
    </div>
  );
};

export default DueListHeader;