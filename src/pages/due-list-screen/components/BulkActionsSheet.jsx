import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionsSheet = ({ isOpen, onClose, selectedCount, onExportDueList, onPrintSummary, onSendGroupMessage }) => {
  if (!isOpen) return null;

  const actions = [
    {
      id: 'export',
      title: 'বকেয়া তালিকা এক্সপোর্ট',
      titleEn: 'Export Due List',
      description: 'CSV ফরম্যাটে ডাউনলোড করুন',
      icon: 'Download',
      onClick: onExportDueList
    },
    {
      id: 'print',
      title: 'সারসংক্ষেপ প্রিন্ট',
      titleEn: 'Print Summary',
      description: 'PDF রিপোর্ট তৈরি করুন',
      icon: 'Printer',
      onClick: onPrintSummary
    },
    {
      id: 'group_message',
      title: 'গ্রুপ মেসেজ পাঠান',
      titleEn: 'Send Group Message',
      description: `${selectedCount} জনকে একসাথে রিমাইন্ডার`,
      icon: 'MessageSquareMore',
      onClick: onSendGroupMessage
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-xl border-t border-border animate-slide-up">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground bangla-text">
                বাল্ক অ্যাকশন
              </h3>
              <p className="text-sm text-muted-foreground bangla-text">
                {selectedCount} টি আইটেম নির্বাচিত
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {actions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => {
                  action?.onClick();
                  onClose();
                }}
                className="w-full flex items-center p-4 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Icon name={action?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground bangla-text">
                    {action?.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {action?.description}
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Cancel Button */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full bangla-text"
            >
              বাতিল করুন
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkActionsSheet;