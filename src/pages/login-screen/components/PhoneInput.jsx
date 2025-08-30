import React from 'react';
import Input from '../../../components/ui/Input';

const PhoneInput = ({ value, onChange, error, disabled }) => {
  const handlePhoneChange = (e) => {
    const phoneValue = e?.target?.value?.replace(/\D/g, '');
    if (phoneValue?.length <= 11) {
      onChange(phoneValue);
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    if (phone?.length <= 4) return phone;
    if (phone?.length <= 7) return `${phone?.slice(0, 4)}-${phone?.slice(4)}`;
    return `${phone?.slice(0, 4)}-${phone?.slice(4, 7)}-${phone?.slice(7)}`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground bangla-text">
        মোবাইল নম্বর *
      </label>
      <div className="flex">
        <div className="flex items-center px-3 py-2 bg-muted border border-border rounded-l-md">
          <span className="text-sm font-medium text-foreground">+৮৮০</span>
        </div>
        <Input
          type="tel"
          placeholder="১৭১২৩৪৫৬৭৮"
          value={formatPhoneDisplay(value)}
          onChange={handlePhoneChange}
          disabled={disabled}
          error={error}
          className="rounded-l-none flex-1"
          maxLength={13}
        />
      </div>
      <p className="text-xs text-muted-foreground bangla-text">
        উদাহরণ: ১৭১২৩৪৫৬৭৮
      </p>
    </div>
  );
};

export default PhoneInput;