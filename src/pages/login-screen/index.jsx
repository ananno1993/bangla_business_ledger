import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import AuthToggle from './components/AuthToggle';
import PhoneInput from './components/PhoneInput';
import EmailInput from './components/EmailInput';
import OTPModal from './components/OTPModal';
import BiometricPrompt from './components/BiometricPrompt';
import RateLimitMessage from './components/RateLimitMessage';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [errors, setErrors] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitTime, setRateLimitTime] = useState(0);

  // Mock credentials for testing
  const mockCredentials = {
    phone: '1712345678',
    email: 'user@example.com',
    otp: '123456'
  };

  useEffect(() => {
    // Load saved phone number
    const savedPhone = localStorage.getItem('savedPhoneNumber');
    if (savedPhone) {
      setPhoneNumber(savedPhone);
    }
  }, []);

  const validateInput = () => {
    const newErrors = {};

    if (authMethod === 'phone') {
      if (!phoneNumber) {
        newErrors.phone = 'মোবাইল নম্বর প্রয়োজন';
      } else if (phoneNumber?.length !== 11 || !phoneNumber?.startsWith('1')) {
        newErrors.phone = 'সঠিক মোবাইল নম্বর লিখুন (১১ সংখ্যা)';
      }
    } else {
      if (!email) {
        newErrors.email = 'ইমেইল ঠিকানা প্রয়োজন';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email)) {
        newErrors.email = 'সঠিক ইমেইল ঠিকানা লিখুন';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateInput()) return;

    if (isRateLimited) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const inputValue = authMethod === 'phone' ? phoneNumber : email;
      const mockValue = authMethod === 'phone' ? mockCredentials?.phone : mockCredentials?.email;

      if (inputValue === mockValue) {
        // Save phone number for future use
        if (authMethod === 'phone') {
          localStorage.setItem('savedPhoneNumber', phoneNumber);
        }
        setShowOTP(true);
        setAttemptCount(0);
      } else {
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);

        if (newAttemptCount >= 3) {
          setIsRateLimited(true);
          setRateLimitTime(180); // 3 minutes
        }

        setErrors({
          [authMethod]: authMethod === 'phone' ?'এই নম্বরটি নিবন্ধিত নয়। সঠিক নম্বর: ১৭১২৩৪৫৬৭৮' :'এই ইমেইলটি নিবন্ধিত নয়। সঠিক ইমেইল: user@example.com'
        });
      }
    } catch (error) {
      setErrors({
        general: 'নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otpValue) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otpValue === mockCredentials?.otp) {
        setShowOTP(false);
        
        // Check if biometric is available (mock)
        const hasBiometric = Math.random() > 0.5;
        if (hasBiometric) {
          setShowBiometric(true);
        } else {
          navigate('/dashboard-screen');
        }
      } else {
        setErrors({
          otp: 'ভুল OTP। সঠিক OTP: ১২৩৪৫৬'
        });
      }
    } catch (error) {
      setErrors({
        otp: 'OTP যাচাই করতে সমস্যা হয়েছে'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricEnable = () => {
    localStorage.setItem('biometricEnabled', 'true');
    setShowBiometric(false);
    navigate('/dashboard-screen');
  };

  const handleBiometricSkip = () => {
    setShowBiometric(false);
    navigate('/dashboard-screen');
  };

  const handleForgotPassword = () => {
    // Navigate to password recovery (mock)
    alert('পাসওয়ার্ড রিসেট লিংক পাঠানো হবে');
  };

  const handleRateLimitComplete = () => {
    setIsRateLimited(false);
    setAttemptCount(0);
  };

  const isFormValid = authMethod === 'phone' 
    ? phoneNumber?.length === 11 && phoneNumber?.startsWith('1')
    : email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(email);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mx-auto mb-4">
            <Icon name="BookOpen" size={40} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground bangla-text mb-2">
            বাংলা বিজনেস লেজার
          </h1>
          <p className="text-muted-foreground text-sm">
            আপনার ব্যবসার হিসাব রাখুন সহজেই
          </p>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-sm mx-auto space-y-6">
          <AuthToggle 
            authMethod={authMethod} 
            onToggle={setAuthMethod} 
          />

          <RateLimitMessage
            isVisible={isRateLimited}
            remainingTime={rateLimitTime}
            onComplete={handleRateLimitComplete}
          />

          {errors?.general && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3">
              <p className="text-sm text-error bangla-text">{errors?.general}</p>
            </div>
          )}

          {authMethod === 'phone' ? (
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={errors?.phone}
              disabled={isLoading || isRateLimited}
            />
          ) : (
            <EmailInput
              value={email}
              onChange={setEmail}
              error={errors?.email}
              disabled={isLoading || isRateLimited}
            />
          )}

          <Button
            variant="default"
            fullWidth
            onClick={handleSendOTP}
            disabled={!isFormValid || isLoading || isRateLimited}
            loading={isLoading}
            iconName="Send"
            iconPosition="right"
            className="bangla-text touch-target-large"
          >
            OTP পাঠান
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={handleForgotPassword}
              className="bangla-text text-sm"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground bangla-text">
          লগইন করে আপনি আমাদের নিয়ম ও শর্তাবলী মেনে নিচ্ছেন
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          © {new Date()?.getFullYear()} Bangla Business Ledger
        </p>
      </div>
      {/* Modals */}
      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        phoneNumber={phoneNumber}
        email={email}
        authMethod={authMethod}
        isLoading={isLoading}
      />
      <BiometricPrompt
        isOpen={showBiometric}
        onClose={() => setShowBiometric(false)}
        onEnable={handleBiometricEnable}
        onSkip={handleBiometricSkip}
      />
    </div>
  );
};

export default LoginScreen;