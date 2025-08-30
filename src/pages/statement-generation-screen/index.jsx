import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import BusinessHeaderForm from './components/BusinessHeaderForm';
import DateRangePicker from './components/DateRangePicker';
import ContactSelector from './components/ContactSelector';
import StatementTemplateSelector from './components/StatementTemplateSelector';
import CustomizationOptions from './components/CustomizationOptions';
import GenerateButton from './components/GenerateButton';
import PreviewModal from './components/PreviewModal';

const StatementGenerationScreen = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('bn');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [generatedPDF, setGeneratedPDF] = useState(null);

  // Form state
  const [businessData, setBusinessData] = useState({
    logo: null,
    nameBangla: 'আমার দোকান',
    nameEnglish: 'My Shop',
    address: '১২৩ মেইন রোড, ঢাকা ১২০০',
    phone: '০১৭১২৩৪৫৬৭৮',
    email: 'myshop@example.com',
    website: 'www.myshop.com'
  });

  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)?.toISOString()?.split('T')?.[0],
    endDate: new Date()?.toISOString()?.split('T')?.[0]
  });

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');
  const [customizationOptions, setCustomizationOptions] = useState({
    showOpeningBalance: true,
    showRunningTotals: true,
    includeTransactionNotes: true,
    includeAttachedReceipts: false,
    showBusinessTerms: false,
    includeBanglaDate: true,
    showContactDetails: true,
    includePaymentInstructions: false
  });

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'bn';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Validation
  const isFormValid = () => {
    return (businessData?.nameBangla?.trim() !== '' &&
    dateRange?.startDate !== '' &&
    dateRange?.endDate !== '' &&
    selectedContacts?.length > 0 && selectedTemplate !== '');
  };

  // Generate PDF simulation
  const handleGenerate = async () => {
    if (!isFormValid()) {
      alert('অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    const steps = [
      { progress: 25, message: 'ডেটা সংগ্রহ করা হচ্ছে...' },
      { progress: 50, message: 'টেমপ্লেট প্রস্তুত করা হচ্ছে...' },
      { progress: 75, message: 'PDF তৈরি করা হচ্ছে...' },
      { progress: 100, message: 'সম্পন্ন!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress(step?.progress);
      setStatusMessage(step?.message);
    }

    // Mock generated PDF data
    setGeneratedPDF({
      id: Date.now(),
      filename: `statement_${Date.now()}.pdf`,
      size: '2.3 MB',
      pages: 3,
      contacts: selectedContacts?.length,
      dateRange: dateRange,
      template: selectedTemplate
    });

    setIsGenerating(false);
    setShowPreview(true);
  };

  // Handle sharing
  const handleShare = (method) => {
    const messages = {
      whatsapp: 'WhatsApp এ স্টেটমেন্ট পাঠানো হয়েছে',
      sms: 'SMS এ লিংক পাঠানো হয়েছে',
      email: 'ইমেইল সংযুক্তি পাঠানো হয়েছে',
      download: 'ডিভাইসে সেভ করা হয়েছে'
    };

    alert(messages?.[method] || 'শেয়ার করা হয়েছে');
    setShowPreview(false);
  };

  const texts = {
    bn: {
      title: 'স্টেটমেন্ট তৈরি করুন',
      subtitle: 'পেশাদার PDF স্টেটমেন্ট তৈরি করুন',
      backButton: 'ফিরে যান'
    },
    en: {
      title: 'Generate Statement',
      subtitle: 'Create professional PDF statements',
      backButton: 'Go Back'
    }
  };

  const currentTexts = texts?.[currentLanguage];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard-screen')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={16}
                  className="bangla-text"
                >
                  {currentTexts?.backButton}
                </Button>
                
                <div>
                  <h1 className="text-2xl font-bold text-foreground bangla-text">
                    {currentTexts?.title}
                  </h1>
                  <p className="text-muted-foreground bangla-text">
                    {currentTexts?.subtitle}
                  </p>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentLanguage === 'bn' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCurrentLanguage('bn');
                    localStorage.setItem('selectedLanguage', 'bn');
                  }}
                >
                  বাংলা
                </Button>
                <Button
                  variant={currentLanguage === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setCurrentLanguage('en');
                    localStorage.setItem('selectedLanguage', 'en');
                  }}
                >
                  English
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Business Header Form */}
              <BusinessHeaderForm
                businessData={businessData}
                onBusinessDataChange={setBusinessData}
              />

              {/* Date Range Picker */}
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />

              {/* Contact Selector */}
              <ContactSelector
                selectedContacts={selectedContacts}
                onContactsChange={setSelectedContacts}
              />

              {/* Statement Template Selector */}
              <StatementTemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />

              {/* Customization Options */}
              <CustomizationOptions
                options={customizationOptions}
                onOptionsChange={setCustomizationOptions}
              />
            </div>

            {/* Right Column - Generate Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <GenerateButton
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  disabled={!isFormValid()}
                  progress={generationProgress}
                  statusMessage={statusMessage}
                />

                {/* Form Summary */}
                <div className="mt-6 bg-card rounded-lg border border-border p-4">
                  <h3 className="font-semibold text-foreground mb-3 bangla-text">
                    সারসংক্ষেপ
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground bangla-text">ব্যবসার নাম:</span>
                      <span className="text-foreground bangla-text">{businessData?.nameBangla}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground bangla-text">তারিখের পরিসর:</span>
                      <span className="text-foreground">
                        {dateRange?.startDate && dateRange?.endDate
                          ? `${new Date(dateRange.startDate)?.toLocaleDateString('bn-BD')} - ${new Date(dateRange.endDate)?.toLocaleDateString('bn-BD')}`
                          : 'নির্বাচিত নয়'
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground bangla-text">যোগাযোগ:</span>
                      <span className="text-foreground bangla-text">
                        {selectedContacts?.length} টি নির্বাচিত
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground bangla-text">টেমপ্লেট:</span>
                      <span className="text-foreground bangla-text">
                        {selectedTemplate === 'summary' && 'সংক্ষিপ্ত'}
                        {selectedTemplate === 'detailed' && 'বিস্তারিত'}
                        {selectedTemplate === 'history' && 'লেনদেনের ইতিহাস'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          pdfData={generatedPDF}
          onShare={handleShare}
        />
      </main>
    </div>
  );
};

export default StatementGenerationScreen;