import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleMainAction = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      navigate('/transaction-entry-screen');
    }
  };

  const handleQuickAction = (type) => {
    navigate('/transaction-entry-screen', { state: { defaultType: type } });
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Action Buttons */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-3">
              <div className="bg-card px-3 py-2 rounded-lg shadow-md border border-border">
                <span className="text-sm font-medium bangla-text text-foreground">
                  পেলাম
                </span>
              </div>
              <Button
                variant="default"
                size="icon"
                iconName="ArrowDownLeft"
                iconSize={20}
                onClick={() => handleQuickAction('পেলাম')}
                className="w-12 h-12 bg-success hover:bg-success/90 shadow-lg"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-card px-3 py-2 rounded-lg shadow-md border border-border">
                <span className="text-sm font-medium bangla-text text-foreground">
                  দিলাম
                </span>
              </div>
              <Button
                variant="default"
                size="icon"
                iconName="ArrowUpRight"
                iconSize={20}
                onClick={() => handleQuickAction('দিলাম')}
                className="w-12 h-12 bg-error hover:bg-error/90 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        iconName={isExpanded ? "X" : "Plus"}
        iconSize={24}
        onClick={handleMainAction}
        onLongPress={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 touch-target-large"
      />
    </div>
  );
};

export default FloatingActionButton;