import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/ui/Button';


const OTPModal = ({ isOpen, onClose, onVerify, phoneNumber, email, authMethod, isLoading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(120);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      // Focus first input
      setTimeout(() => {
        inputRefs?.current?.[0]?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft > 0 && isOpen) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isOpen]);

  const handleOtpChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp?.join('');
    if (otpString?.length === 6) {
      onVerify(otpString);
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs?.current?.[0]?.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-card w-full max-w-md rounded-t-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground bangla-text">
            OTP যাচাই করুন
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-muted-foreground bangla-text mb-2">
            আমরা একটি ৬ সংখ্যার কোড পাঠিয়েছি
          </p>
          <p className="font-medium text-foreground">
            {authMethod === 'phone' ? `+৮৮০ ${phoneNumber}` : email}
          </p>
        </div>

        <div className="flex justify-center space-x-3 mb-6">
          {otp?.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e?.target?.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          variant="default"
          fullWidth
          onClick={handleVerify}
          disabled={otp?.join('')?.length !== 6 || isLoading}
          loading={isLoading}
          className="mb-4 bangla-text touch-target"
        >
          যাচাই করুন
        </Button>

        <div className="text-center">
          {!canResend ? (
            <p className="text-sm text-muted-foreground bangla-text">
              পুনরায় পাঠান {formatTime(timeLeft)} সেকেন্ডে
            </p>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              className="bangla-text"
            >
              পুনরায় OTP পাঠান
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPModal;