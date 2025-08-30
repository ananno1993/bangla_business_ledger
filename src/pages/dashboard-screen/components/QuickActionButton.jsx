import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionButton = ({ title, iconName, onClick, variant = "outline", className = "" }) => {
  return (
    <Button
      variant={variant}
      size="default"
      iconName={iconName}
      iconPosition="left"
      iconSize={20}
      onClick={onClick}
      className={`flex-1 h-12 bangla-text font-medium ${className}`}
      fullWidth
    >
      {title}
    </Button>
  );
};

export default QuickActionButton;