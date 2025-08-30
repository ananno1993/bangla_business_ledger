import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onAddTransaction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Receipt" size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground bangla-text mb-2">
        কোনো লেনদেন নেই
      </h3>
      <p className="text-muted-foreground bangla-text mb-6 max-w-sm">
        আপনার ব্যবসার প্রথম লেনদেন যোগ করুন এবং হিসাব রাখা শুরু করুন
      </p>
      <Button
        variant="default"
        size="lg"
        iconName="Plus"
        iconPosition="left"
        iconSize={20}
        onClick={onAddTransaction}
        className="bangla-text font-medium"
      >
        প্রথম লেনদেন যোগ করুন
      </Button>
    </div>
  );
};

export default EmptyState;