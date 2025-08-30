import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, amount, type, onClick, className = "" }) => {
  const getCardStyles = () => {
    switch (type) {
      case 'receivable':
        return 'bg-success text-success-foreground border-success/20';
      case 'payable':
        return 'bg-error text-error-foreground border-error/20';
      case 'today':
        return 'bg-primary text-primary-foreground border-primary/20';
      default:
        return 'bg-card text-card-foreground border-border';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'receivable':
        return 'TrendingUp';
      case 'payable':
        return 'TrendingDown';
      case 'today':
        return 'Calendar';
      default:
        return 'DollarSign';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95 touch-target ${getCardStyles()} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium bangla-text opacity-90">{title}</h3>
        <Icon name={getIcon()} size={20} className="opacity-75" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold data-text">৳</span>
        <span className="text-2xl font-bold ml-1 data-text">{amount?.toLocaleString('bn-BD')}</span>
      </div>
    </div>
  );
};

export default SummaryCard;