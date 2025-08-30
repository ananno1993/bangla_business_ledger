import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContactCard = ({ 
  contact, 
  onCall, 
  onWhatsApp, 
  onViewLedger, 
  onEdit, 
  onDelete,
  isSelected,
  onSelect,
  showActions = false,
  onSwipeLeft,
  onSwipeRight 
}) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'symbol'
    })?.format(Math.abs(amount));
  };

  const getBalanceColor = (balance) => {
    if (balance > 0) return 'text-success';
    if (balance < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getBalanceText = (balance) => {
    if (balance > 0) return 'পাবো'; // Will receive
    if (balance < 0) return 'দিতে হবে'; // Need to pay
    return 'সমান'; // Equal
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 mb-3 transition-all duration-200 ${
      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
    }`}>
      <div className="flex items-center justify-between">
        {/* Contact Info */}
        <div className="flex items-center space-x-3 flex-1">
          {/* Selection Checkbox */}
          {showActions && (
            <button
              onClick={() => onSelect(contact?.id)}
              className="w-5 h-5 rounded border-2 border-border flex items-center justify-center"
            >
              {isSelected && <Icon name="Check" size={12} color="var(--color-primary)" />}
            </button>
          )}

          {/* Profile Picture */}
          <div className="relative">
            <Image
              src={contact?.avatar}
              alt={contact?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              contact?.type === 'customer' ? 'bg-primary' : 'bg-secondary'
            }`}>
              <Icon 
                name={contact?.type === 'customer' ? 'User' : 'Building'} 
                size={8} 
                color="white" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground bangla-text truncate">
                {contact?.name}
              </h3>
              {contact?.isPriority && (
                <Icon name="Star" size={14} color="var(--color-warning)" />
              )}
            </div>
            <p className="text-sm text-muted-foreground data-text">
              {contact?.phone}
            </p>
            <p className="text-xs text-muted-foreground bangla-text">
              শেষ লেনদেন: {contact?.lastTransactionDate}
            </p>
          </div>
        </div>

        {/* Balance Info */}
        <div className="text-right">
          <div className={`font-bold text-lg ${getBalanceColor(contact?.balance)}`}>
            {formatBalance(contact?.balance)}
          </div>
          <div className={`text-xs bangla-text ${getBalanceColor(contact?.balance)}`}>
            {getBalanceText(contact?.balance)}
          </div>
          <div className="text-xs text-muted-foreground bangla-text">
            মোট লেনদেন: {contact?.totalTransactions}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCall(contact)}
            iconName="Phone"
            iconSize={14}
            className="text-primary hover:bg-primary/10"
          >
            কল
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onWhatsApp(contact)}
            iconName="MessageCircle"
            iconSize={14}
            className="text-success hover:bg-success/10"
          >
            হোয়াটসঅ্যাপ
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewLedger(contact)}
            iconName="FileText"
            iconSize={14}
            className="text-secondary hover:bg-secondary/10"
          >
            খাতা দেখুন
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(contact)}
            iconName="Edit"
            iconSize={14}
            className="text-muted-foreground hover:bg-muted"
          >
            সম্পাদনা
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;