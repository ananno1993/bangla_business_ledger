import React from 'react';
import Input from '../../../components/ui/Input';

const EmailInput = ({ value, onChange, error, disabled }) => {
  return (
    <Input
      type="email"
      label="ইমেইল ঠিকানা *"
      placeholder="আপনার ইমেইল লিখুন"
      value={value}
      onChange={(e) => onChange(e?.target?.value)}
      error={error}
      disabled={disabled}
      description="উদাহরণ: user@example.com"
      className="bangla-text"
    />
  );
};

export default EmailInput;