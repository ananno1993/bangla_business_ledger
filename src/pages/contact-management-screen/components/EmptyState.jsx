import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onAddContact, onImportCSV, hasSearchTerm }) => {
  if (hasSearchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 bangla-text">
          কোন ফলাফল পাওয়া যায়নি
        </h3>
        <p className="text-muted-foreground text-center mb-6 bangla-text">
          আপনার অনুসন্ধানের সাথে মিলে এমন কোন যোগাযোগ খুঁজে পাওয়া যায়নি।\nঅন্য কিছু দিয়ে চেষ্টা করুন।
        </p>
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          className="bangla-text"
        >
          পুনরায় লোড করুন
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-8">
        <Icon name="Users" size={48} color="var(--color-primary)" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-3 bangla-text">
        এখনও কোন যোগাযোগ নেই
      </h3>
      
      <p className="text-muted-foreground text-center mb-8 max-w-sm bangla-text">
        আপনার গ্রাহক এবং সরবরাহকারীদের যোগ করে শুরু করুন।\nআপনি একটি একটি করে যোগ করতে পারেন বা CSV ফাইল আপলোড করতে পারেন।
      </p>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={onAddContact}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="bangla-text"
        >
          নতুন যোগাযোগ যোগ করুন
        </Button>
        
        <Button
          variant="outline"
          onClick={onImportCSV}
          iconName="Upload"
          iconPosition="left"
          iconSize={16}
          className="bangla-text"
        >
          CSV আপলোড করুন
        </Button>
      </div>

      {/* Quick Tips */}
      <div className="mt-12 max-w-md">
        <h4 className="text-sm font-medium text-foreground mb-4 bangla-text">
          দ্রুত শুরু করার টিপস:
        </h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="User" size={12} color="var(--color-primary)" />
            </div>
            <p className="text-sm text-muted-foreground bangla-text">
              গ্রাহকদের জন্য প্রারম্ভিক ব্যালেন্স "পাবো" হিসেবে সেট করুন
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Building" size={12} color="var(--color-secondary)" />
            </div>
            <p className="text-sm text-muted-foreground bangla-text">
              সরবরাহকারীদের জন্য প্রারম্ভিক ব্যালেন্স "দিতে হবে" হিসেবে সেট করুন
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Star" size={12} color="var(--color-warning)" />
            </div>
            <p className="text-sm text-muted-foreground bangla-text">
              গুরুত্বপূর্ণ যোগাযোগ চিহ্নিত করে রাখুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;