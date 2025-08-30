import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GenerateButton = ({ 
  isGenerating, 
  onGenerate, 
  disabled, 
  progress = 0,
  statusMessage = '' 
}) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="text-center">
        {/* Generate Button */}
        <Button
          variant="default"
          size="lg"
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          loading={isGenerating}
          iconName={isGenerating ? "Loader2" : "FileText"}
          iconPosition="left"
          iconSize={20}
          className="w-full bangla-text font-semibold"
        >
          {isGenerating ? 'স্টেটমেন্ট তৈরি হচ্ছে...' : 'স্টেটমেন্ট তৈরি করুন'}
        </Button>

        {/* Progress Indicator */}
        {isGenerating && (
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Status Message */}
            {statusMessage && (
              <p className="text-sm text-muted-foreground bangla-text">
                {statusMessage}
              </p>
            )}
            
            {/* Progress Percentage */}
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% সম্পন্ন
            </p>
          </div>
        )}

        {/* Generation Steps */}
        {isGenerating && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 25 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground bangla-text">ডেটা সংগ্রহ</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 50 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground bangla-text">টেমপ্লেট প্রস্তুতি</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 75 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground bangla-text">PDF তৈরি</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground bangla-text">সম্পন্ন</span>
            </div>
          </div>
        )}

        {/* Help Text */}
        {!isGenerating && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-foreground bangla-text font-medium mb-1">
                  স্টেটমেন্ট তৈরির আগে নিশ্চিত করুন:
                </p>
                <ul className="text-xs text-muted-foreground bangla-text space-y-1">
                  <li>• ব্যবসার তথ্য সঠিকভাবে পূরণ করা হয়েছে</li>
                  <li>• তারিখের পরিসর নির্বাচন করা হয়েছে</li>
                  <li>• কমপক্ষে একটি যোগাযোগ নির্বাচন করা হয়েছে</li>
                  <li>• টেমপ্লেট এবং কাস্টমাইজেশন অপশন সেট করা হয়েছে</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateButton;