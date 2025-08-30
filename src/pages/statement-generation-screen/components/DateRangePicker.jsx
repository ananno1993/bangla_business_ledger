import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateRangePicker = ({ dateRange, onDateRangeChange }) => {
  const [selectedPreset, setSelectedPreset] = useState('custom');

  const presets = [
    { 
      key: 'thisMonth', 
      label: 'এই মাস', 
      labelEn: 'This Month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { startDate: start?.toISOString()?.split('T')?.[0], endDate: end?.toISOString()?.split('T')?.[0] };
      }
    },
    { 
      key: 'lastMonth', 
      label: 'গত মাস', 
      labelEn: 'Last Month',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const end = new Date(now.getFullYear(), now.getMonth(), 0);
        return { startDate: start?.toISOString()?.split('T')?.[0], endDate: end?.toISOString()?.split('T')?.[0] };
      }
    },
    { 
      key: 'last3Months', 
      label: 'গত ৩ মাস', 
      labelEn: 'Last 3 Months',
      getValue: () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return { startDate: start?.toISOString()?.split('T')?.[0], endDate: end?.toISOString()?.split('T')?.[0] };
      }
    },
    { 
      key: 'custom', 
      label: 'কাস্টম', 
      labelEn: 'Custom',
      getValue: () => dateRange
    }
  ];

  const handlePresetClick = (preset) => {
    setSelectedPreset(preset?.key);
    if (preset?.key !== 'custom') {
      const newRange = preset?.getValue();
      onDateRangeChange(newRange);
    }
  };

  const handleDateChange = (field, value) => {
    setSelectedPreset('custom');
    onDateRangeChange({ ...dateRange, [field]: value });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 bangla-text">
        তারিখের পরিসর
      </h3>
      {/* Date Presets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {presets?.map((preset) => (
          <Button
            key={preset?.key}
            variant={selectedPreset === preset?.key ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className="bangla-text text-xs"
          >
            <div className="flex flex-col items-center">
              <span className="font-medium">{preset?.label}</span>
              <span className="text-xs opacity-75">{preset?.labelEn}</span>
            </div>
          </Button>
        ))}
      </div>
      {/* Custom Date Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="শুরুর তারিখ"
          type="date"
          value={dateRange?.startDate}
          onChange={(e) => handleDateChange('startDate', e?.target?.value)}
          className="bangla-text"
          required
        />
        
        <Input
          label="শেষের তারিখ"
          type="date"
          value={dateRange?.endDate}
          onChange={(e) => handleDateChange('endDate', e?.target?.value)}
          className="bangla-text"
          required
        />
      </div>
      {/* Date Range Summary */}
      {dateRange?.startDate && dateRange?.endDate && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground bangla-text">
            নির্বাচিত পরিসর: {new Date(dateRange.startDate)?.toLocaleDateString('bn-BD')} থেকে {new Date(dateRange.endDate)?.toLocaleDateString('bn-BD')}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;