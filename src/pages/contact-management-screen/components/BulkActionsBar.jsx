import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ selectedCount, onClearSelection, onBulkReminder, onBulkExport, onBulkDelete }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} color="var(--color-primary)" />
              <span className="font-medium text-foreground bangla-text">
                {selectedCount}টি নির্বাচিত
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconSize={16}
              className="text-muted-foreground"
            >
              বাতিল
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkReminder}
              iconName="MessageSquare"
              iconPosition="left"
              iconSize={16}
              className="bangla-text"
            >
              রিমাইন্ডার
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkExport}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="bangla-text"
            >
              এক্সপোর্ট
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="bangla-text"
            >
              মুছুন
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;