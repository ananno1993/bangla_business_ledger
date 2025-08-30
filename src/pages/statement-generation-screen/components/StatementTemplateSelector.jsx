import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatementTemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    {
      id: 'summary',
      name: 'সংক্ষিপ্ত',
      nameEn: 'Summary',
      description: 'মোট পাওনা-দেনার সংক্ষিপ্ত বিবরণ',
      descriptionEn: 'Brief overview of total receivables and payables',
      icon: 'FileText',
      features: ['Opening Balance', 'Total Received', 'Total Given', 'Closing Balance']
    },
    {
      id: 'detailed',
      name: 'বিস্তারিত',
      nameEn: 'Detailed',
      description: 'সব লেনদেনের বিস্তারিত তালিকা',
      descriptionEn: 'Complete list of all transactions',
      icon: 'List',
      features: ['All Transactions', 'Date & Time', 'Transaction Notes', 'Running Balance']
    },
    {
      id: 'history',
      name: 'লেনদেনের ইতিহাস',
      nameEn: 'Transaction History',
      description: 'তারিখ অনুযায়ী সাজানো লেনদেনের ইতিহাস',
      descriptionEn: 'Chronological transaction history',
      icon: 'Clock',
      features: ['Chronological Order', 'Daily Summaries', 'Monthly Totals', 'Balance Trends']
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 bangla-text">
        স্টেটমেন্ট টেমপ্লেট
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template?.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onTemplateChange(template?.id)}
          >
            {/* Selection Indicator */}
            {selectedTemplate === template?.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}

            {/* Template Icon */}
            <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-3">
              <Icon name={template?.icon} size={24} color="var(--color-primary)" />
            </div>

            {/* Template Info */}
            <div className="mb-3">
              <h4 className="font-semibold text-foreground bangla-text mb-1">
                {template?.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-1">
                {template?.nameEn}
              </p>
              <p className="text-sm text-muted-foreground bangla-text">
                {template?.description}
              </p>
            </div>

            {/* Template Features */}
            <div className="space-y-1">
              {template?.features?.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Check" size={12} className="mr-2 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Preview Button */}
            <Button
              variant="outline"
              size="xs"
              className="w-full mt-3 bangla-text"
              iconName="Eye"
              iconPosition="left"
              iconSize={12}
            >
              প্রিভিউ দেখুন
            </Button>
          </div>
        ))}
      </div>
      {/* Template Preview Thumbnails */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3 bangla-text">
          নির্বাচিত টেমপ্লেটের প্রিভিউ
        </h4>
        <div className="bg-muted rounded-lg p-4 border-2 border-dashed border-border">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Icon name="FileText" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground bangla-text">
                {templates?.find(t => t?.id === selectedTemplate)?.name || 'টেমপ্লেট'} এর প্রিভিউ
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF জেনারেট করার পর সম্পূর্ণ প্রিভিউ দেখতে পাবেন
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementTemplateSelector;