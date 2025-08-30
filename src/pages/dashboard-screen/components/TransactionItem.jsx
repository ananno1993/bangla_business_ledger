import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionItem = ({ transaction, onEdit, onDelete, onDuplicate }) => {
  const [showActions, setShowActions] = useState(false);

  const handleSwipeRight = (e) => {
    e?.preventDefault();
    setShowActions(!showActions);
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTransactionIcon = () => {
    return transaction?.type === 'পেলাম' ? 'ArrowDownLeft' : 'ArrowUpRight';
  };

  const getTransactionColor = () => {
    return transaction?.type === 'পেলাম' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg mb-3 overflow-hidden">
      <div
        className="p-4 cursor-pointer touch-target"
        onTouchStart={handleSwipeRight}
        onClick={handleSwipeRight}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`p-2 rounded-full bg-muted ${getTransactionColor()}`}>
              <Icon name={getTransactionIcon()} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground bangla-text truncate">
                {transaction?.contactName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formatTime(transaction?.date)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold text-lg data-text ${getTransactionColor()}`}>
              ৳{transaction?.amount?.toLocaleString('bn-BD')}
            </div>
            <div className={`text-xs font-medium bangla-text ${getTransactionColor()}`}>
              {transaction?.type}
            </div>
          </div>
        </div>
        {transaction?.note && (
          <p className="text-sm text-muted-foreground mt-2 bangla-text">
            {transaction?.note}
          </p>
        )}
      </div>
      {/* Quick Actions */}
      {showActions && (
        <div className="border-t border-border bg-muted/50 p-3">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              iconSize={14}
              onClick={() => onEdit(transaction)}
              className="flex-1"
            >
              সম্পাদনা
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              iconSize={14}
              onClick={() => onDuplicate(transaction)}
              className="flex-1"
            >
              কপি
            </Button>
            <Button
              variant="destructive"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
              onClick={() => onDelete(transaction)}
              className="flex-1"
            >
              মুছুন
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;