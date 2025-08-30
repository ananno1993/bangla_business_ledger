import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BiometricPrompt = ({ isOpen, onClose, onEnable, onSkip }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Fingerprint" size={32} color="var(--color-primary)" />
          </div>
          <h2 className="text-xl font-semibold text-foreground bangla-text mb-2">
            বায়োমেট্রিক সক্রিয় করুন
          </h2>
          <p className="text-muted-foreground bangla-text">
            পরবর্তী লগইনের জন্য ফিঙ্গারপ্রিন্ট বা ফেস আনলক ব্যবহার করুন
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onEnable}
            iconName="Shield"
            iconPosition="left"
            className="bangla-text touch-target"
          >
            সক্রিয় করুন
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={onSkip}
            className="bangla-text touch-target"
          >
            পরে করব
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiometricPrompt;