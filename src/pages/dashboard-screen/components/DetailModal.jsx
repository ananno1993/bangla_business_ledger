import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return `৳${amount?.toLocaleString('bn-BD')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-lg max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground bangla-text">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={20}
            onClick={onClose}
            className="touch-target"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {data?.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={item?.icon} size={16} className="text-primary" />
                </div>
                <span className="text-foreground bangla-text font-medium">
                  {item?.label}
                </span>
              </div>
              <span className="text-foreground font-semibold data-text">
                {formatCurrency(item?.amount)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="default"
            onClick={onClose}
            className="w-full bangla-text"
          >
            বন্ধ করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;