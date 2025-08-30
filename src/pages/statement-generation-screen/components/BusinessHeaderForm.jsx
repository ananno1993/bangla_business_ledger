import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BusinessHeaderForm = ({ businessData, onBusinessDataChange }) => {
  const [logoPreview, setLogoPreview] = useState(businessData?.logo || null);

  const handleLogoUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e?.target?.result;
        setLogoPreview(logoUrl);
        onBusinessDataChange({ ...businessData, logo: logoUrl });
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    onBusinessDataChange({ ...businessData, logo: null });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 bangla-text">
        ব্যবসার তথ্য
      </h3>
      {/* Logo Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
          ব্যবসার লোগো
        </label>
        <div className="flex items-center space-x-4">
          {logoPreview ? (
            <div className="relative">
              <div className="w-20 h-20 rounded-lg border border-border overflow-hidden bg-muted">
                <Image
                  src={logoPreview}
                  alt="Business Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="xs"
                onClick={removeLogo}
                iconName="X"
                iconSize={12}
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
              <Icon name="Image" size={24} color="var(--color-muted-foreground)" />
            </div>
          )}
          
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
              id="logo-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('logo-upload')?.click()}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
              className="bangla-text"
            >
              লোগো আপলোড করুন
            </Button>
          </div>
        </div>
      </div>
      {/* Business Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="ব্যবসার নাম (বাংলা)"
          type="text"
          placeholder="আপনার ব্যবসার নাম লিখুন"
          value={businessData?.nameBangla}
          onChange={(e) => onBusinessDataChange({ ...businessData, nameBangla: e?.target?.value })}
          className="bangla-text"
          required
        />
        
        <Input
          label="Business Name (English)"
          type="text"
          placeholder="Enter business name in English"
          value={businessData?.nameEnglish}
          onChange={(e) => onBusinessDataChange({ ...businessData, nameEnglish: e?.target?.value })}
        />
        
        <Input
          label="ঠিকানা"
          type="text"
          placeholder="ব্যবসার ঠিকানা লিখুন"
          value={businessData?.address}
          onChange={(e) => onBusinessDataChange({ ...businessData, address: e?.target?.value })}
          className="bangla-text"
        />
        
        <Input
          label="ফোন নম্বর"
          type="tel"
          placeholder="০১৭xxxxxxxx"
          value={businessData?.phone}
          onChange={(e) => onBusinessDataChange({ ...businessData, phone: e?.target?.value })}
          className="bangla-text"
        />
        
        <Input
          label="ইমেইল"
          type="email"
          placeholder="business@example.com"
          value={businessData?.email}
          onChange={(e) => onBusinessDataChange({ ...businessData, email: e?.target?.value })}
        />
        
        <Input
          label="ওয়েবসাইট"
          type="url"
          placeholder="www.yourbusiness.com"
          value={businessData?.website}
          onChange={(e) => onBusinessDataChange({ ...businessData, website: e?.target?.value })}
        />
      </div>
    </div>
  );
};

export default BusinessHeaderForm;