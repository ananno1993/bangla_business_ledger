import React from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = ({ isOnline, lastUpdated }) => {
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date?.toLocaleString('bn-BD', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
      isOnline 
        ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
    }`}>
      <Icon 
        name={isOnline ? 'Wifi' : 'WifiOff'} 
        size={16} 
      />
      <span className="bangla-text font-medium">
        {isOnline ? 'অনলাইন' : 'অফলাইন'}
      </span>
      {!isOnline && lastUpdated && (
        <span className="text-xs opacity-75">
          শেষ আপডেট: {formatLastUpdated(lastUpdated)}
        </span>
      )}
    </div>
  );
};

export default OfflineIndicator;