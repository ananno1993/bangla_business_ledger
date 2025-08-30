import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DueContactCard = ({ contact, onCall, onWhatsApp, onSendReminder, onSelect, isSelected }) => {
  const [showReminderOptions, setShowReminderOptions] = useState(false);

  const formatBDT = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount)?.replace('BDT', '৳');
  };

  const getDaysOverdue = (lastTransactionDate) => {
    const today = new Date();
    const lastDate = new Date(lastTransactionDate);
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getAmountColorClass = (amount) => {
    if (amount > 50000) return 'text-error';
    if (amount > 20000) return 'text-warning';
    return 'text-muted-foreground';
  };

  const reminderTemplates = [
    {
      type: 'gentle',
      title: 'নম্র অনুরোধ',
      titleEn: 'Gentle Reminder',
      icon: 'MessageCircle',
      template: `আসসালামু আলাইকুম ${contact?.name},\n\nআশা করি ভালো আছেন। আপনার ${formatBDT(contact?.dueAmount)} টাকা বকেয়া রয়েছে। সুবিধামতো পরিশোধ করলে কৃতজ্ঞ থাকব।\n\nধন্যবাদ`
    },
    {
      type: 'urgent',
      title: 'জরুরি নোটিশ',
      titleEn: 'Urgent Notice',
      icon: 'AlertTriangle',
      template: `প্রিয় ${contact?.name},\n\nআপনার ${formatBDT(contact?.dueAmount)} টাকা ${getDaysOverdue(contact?.lastTransactionDate)} দিন ধরে বকেয়া রয়েছে। অনুগ্রহ করে দ্রুত পরিশোধ করুন।\n\nযোগাযোগ: ${contact?.phone}`
    },
    {
      type: 'final',
      title: 'চূড়ান্ত নোটিশ',
      titleEn: 'Final Notice',
      icon: 'AlertOctagon',
      template: `${contact?.name},\n\nএটি চূড়ান্ত নোটিশ। আপনার ${formatBDT(contact?.dueAmount)} টাকা অবিলম্বে পরিশোধ করুন। অন্যথায় আইনি ব্যবস্থা নেওয়া হবে।\n\nব্যবসা প্রতিষ্ঠান`
    }
  ];

  const handleReminderSelect = (template) => {
    onSendReminder(contact, template);
    setShowReminderOptions(false);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 mb-3 transition-all ${
      isSelected ? 'ring-2 ring-primary border-primary' : ''
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground bangla-text">
              {contact?.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              contact?.type === 'customer' ?'bg-blue-100 text-blue-800' :'bg-green-100 text-green-800'
            }`}>
              {contact?.type === 'customer' ? 'গ্রাহক' : 'সরবরাহকারী'}
            </span>
          </div>
          
          <div className={`text-2xl font-bold mb-1 ${getAmountColorClass(contact?.dueAmount)}`}>
            {formatBDT(contact?.dueAmount)}
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="bangla-text">
                {getDaysOverdue(contact?.lastTransactionDate)} দিন আগে
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>
                {new Date(contact.lastTransactionDate)?.toLocaleDateString('bn-BD')}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onSelect(contact?.id)}
          className="touch-target p-2"
        >
          <Icon 
            name={isSelected ? "CheckSquare" : "Square"} 
            size={20} 
            color={isSelected ? "var(--color-primary)" : "var(--color-muted-foreground)"}
          />
        </button>
      </div>
      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCall(contact?.phone)}
          iconName="Phone"
          iconPosition="left"
          iconSize={16}
          className="flex-1 touch-target"
        >
          কল
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onWhatsApp(contact?.phone)}
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={16}
          className="flex-1 touch-target"
        >
          WhatsApp
        </Button>

        <div className="relative">
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowReminderOptions(!showReminderOptions)}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
            className="touch-target bangla-text"
          >
            রিমাইন্ডার
          </Button>

          {showReminderOptions && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50">
              <div className="p-2">
                <div className="text-sm font-medium text-foreground mb-2 bangla-text">
                  রিমাইন্ডার টেমপ্লেট নির্বাচন করুন
                </div>
                {reminderTemplates?.map((template) => (
                  <button
                    key={template?.type}
                    onClick={() => handleReminderSelect(template)}
                    className="w-full flex items-start p-3 rounded-md hover:bg-muted transition-colors text-left mb-1"
                  >
                    <Icon name={template?.icon} size={16} className="mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm bangla-text">
                        {template?.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {template?.titleEn}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {template?.template?.substring(0, 60)}...
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Reminder History */}
      {contact?.reminderHistory && contact?.reminderHistory?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground bangla-text mb-2">
            সর্বশেষ রিমাইন্ডার:
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Icon 
              name={contact?.reminderHistory?.[0]?.status === 'delivered' ? 'CheckCircle' : 'Clock'} 
              size={12} 
              color={contact?.reminderHistory?.[0]?.status === 'delivered' ? 'var(--color-success)' : 'var(--color-warning)'}
            />
            <span className="text-muted-foreground">
              {new Date(contact.reminderHistory[0].sentAt)?.toLocaleDateString('bn-BD')}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              contact?.reminderHistory?.[0]?.status === 'delivered' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
            }`}>
              {contact?.reminderHistory?.[0]?.status === 'delivered' ? 'পৌঁছেছে' : 'পাঠানো হয়েছে'}
            </span>
          </div>
        </div>
      )}
      {/* Overlay for reminder options */}
      {showReminderOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowReminderOptions(false)}
        />
      )}
    </div>
  );
};

export default DueContactCard;