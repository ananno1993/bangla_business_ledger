import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-success/10 rounded-full flex items-center justify-center mb-6">
        <Icon name="PartyPopper" size={48} color="var(--color-success)" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2 bangla-text">
        কোনো বকেয়া নেই!
      </h3>
      
      <p className="text-muted-foreground text-center mb-6 bangla-text max-w-sm">
        অভিনন্দন! সকল গ্রাহক ও সরবরাহকারীর পেমেন্ট আপডেট রয়েছে।
      </p>
      
      <div className="flex flex-col space-y-3 w-full max-w-xs">
        <Button
          variant="default"
          onClick={onRefresh}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
          className="bangla-text"
        >
          রিফ্রেশ করুন
        </Button>
        
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="bangla-text"
        >
          নতুন লেনদেন যোগ করুন
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;