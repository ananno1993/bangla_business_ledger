import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ authMethod, onToggle }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <Button
        variant={authMethod === 'phone' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('phone')}
        className="flex-1 bangla-text"
      >
        ফোন নম্বর
      </Button>
      <Button
        variant={authMethod === 'email' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onToggle('email')}
        className="flex-1 bangla-text"
      >
        ইমেইল
      </Button>
    </div>
  );
};

export default AuthToggle;