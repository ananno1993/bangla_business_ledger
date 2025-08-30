import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RateLimitMessage = ({ isVisible, remainingTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isVisible) {
      onComplete();
    }
  }, [timeLeft, isVisible, onComplete]);

  useEffect(() => {
    setTimeLeft(remainingTime);
  }, [remainingTime]);

  if (!isVisible) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <Icon name="Clock" size={20} color="var(--color-warning)" />
        <div className="flex-1">
          <p className="text-sm font-medium text-warning bangla-text">
            অনেকবার চেষ্টা করেছেন
          </p>
          <p className="text-xs text-muted-foreground bangla-text">
            আবার চেষ্টা করুন {formatTime(timeLeft)} মিনিটে
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitMessage;