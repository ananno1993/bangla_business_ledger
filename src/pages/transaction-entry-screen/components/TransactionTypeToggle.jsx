import React from 'react';
import Button from '../../../components/ui/Button';

const TransactionTypeToggle = ({ transactionType, onToggle }) => {
  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-3 bangla-text">
        লেনদেনের ধরন
      </h3>
      <div className="flex rounded-lg overflow-hidden border border-border">
        <Button
          variant={transactionType === 'received' ? 'default' : 'ghost'}
          size="lg"
          fullWidth
          onClick={() => onToggle('received')}
          className={`rounded-none border-0 bangla-text font-semibold ${
            transactionType === 'received' ?'bg-success text-success-foreground hover:bg-success/90' :'hover:bg-muted'
          }`}
        >
          পেলাম
        </Button>
        <Button
          variant={transactionType === 'given' ? 'default' : 'ghost'}
          size="lg"
          fullWidth
          onClick={() => onToggle('given')}
          className={`rounded-none border-0 bangla-text font-semibold ${
            transactionType === 'given' ?'bg-error text-error-foreground hover:bg-error/90' :'hover:bg-muted'
          }`}
        >
          দিলাম
        </Button>
      </div>
    </div>
  );
};

export default TransactionTypeToggle;