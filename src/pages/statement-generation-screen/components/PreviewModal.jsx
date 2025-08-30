import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ isOpen, onClose, pdfData, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const totalPages = 3; // Mock total pages

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const shareOptions = [
    {
      key: 'whatsapp',
      label: 'WhatsApp এ পাঠান',
      icon: 'MessageCircle',
      color: 'text-green-600'
    },
    {
      key: 'sms',
      label: 'SMS এ লিংক পাঠান',
      icon: 'MessageSquare',
      color: 'text-blue-600'
    },
    {
      key: 'email',
      label: 'ইমেইল সংযুক্তি',
      icon: 'Mail',
      color: 'text-purple-600'
    },
    {
      key: 'download',
      label: 'ডিভাইসে সেভ করুন',
      icon: 'Download',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground bangla-text">
              স্টেটমেন্ট প্রিভিউ
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>পৃষ্ঠা {currentPage} / {totalPages}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              iconName="ZoomOut"
              iconSize={16}
              disabled={zoomLevel <= 50}
            />
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {zoomLevel}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              iconName="ZoomIn"
              iconSize={16}
              disabled={zoomLevel >= 200}
            />
            
            {/* Close Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={16}
            />
          </div>
        </div>

        {/* PDF Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="flex justify-center">
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              style={{ 
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                width: '210mm',
                minHeight: '297mm'
              }}
            >
              {/* Mock PDF Content */}
              <div className="p-8">
                {/* Business Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 bangla-text">
                      আমার দোকান
                    </h1>
                    <p className="text-gray-600">My Shop</p>
                    <p className="text-sm text-gray-500">
                      ১২৩ মেইন রোড, ঢাকা ১২০০
                    </p>
                    <p className="text-sm text-gray-500">
                      ফোন: ০১৭১২৩৪৫৬৭৮
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Icon name="Store" size={32} color="gray" />
                  </div>
                </div>

                {/* Statement Title */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 bangla-text">
                    লেনদেনের বিবরণী
                  </h2>
                  <p className="text-gray-600">Transaction Statement</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ০১ জানুয়ারি ২০২৫ থেকে ৩১ জানুয়ারি ২০২৫
                  </p>
                </div>

                {/* Mock Transaction Table */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 bangla-text">
                          তারিখ
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 bangla-text">
                          বিবরণ
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 bangla-text">
                          পেলাম
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 bangla-text">
                          দিলাম
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 bangla-text">
                          ব্যালেন্স
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">০১/০১/২৫</td>
                        <td className="px-4 py-3 text-sm text-gray-800 bangla-text">প্রারম্ভিক ব্যালেন্স</td>
                        <td className="px-4 py-3 text-sm text-right">-</td>
                        <td className="px-4 py-3 text-sm text-right">-</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">৳২,০০০</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">০৫/০১/২৫</td>
                        <td className="px-4 py-3 text-sm text-gray-800 bangla-text">পণ্য বিক্রয়</td>
                        <td className="px-4 py-3 text-sm text-right text-green-600">৳১,৫০০</td>
                        <td className="px-4 py-3 text-sm text-right">-</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">৳৩,৫০০</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-600">১০/০১/২৫</td>
                        <td className="px-4 py-3 text-sm text-gray-800 bangla-text">নগদ পেমেন্ট</td>
                        <td className="px-4 py-3 text-sm text-right">-</td>
                        <td className="px-4 py-3 text-sm text-right text-red-600">৳১,০০০</td>
                        <td className="px-4 py-3 text-sm text-right font-medium">৳২,৫০০</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 bangla-text mb-2">সারসংক্ষেপ</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 bangla-text">মোট পেলাম:</p>
                      <p className="font-semibold text-green-600">৳১,৫০০</p>
                    </div>
                    <div>
                      <p className="text-gray-600 bangla-text">মোট দিলাম:</p>
                      <p className="font-semibold text-red-600">৳১,০০০</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              iconName="ChevronLeft"
              iconSize={16}
              disabled={currentPage <= 1}
              className="bangla-text"
            >
              পূর্ববর্তী
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              iconName="ChevronRight"
              iconSize={16}
              disabled={currentPage >= totalPages}
              className="bangla-text"
            >
              পরবর্তী
            </Button>
          </div>

          {/* Share Options */}
          <div className="flex items-center space-x-2">
            {shareOptions?.map((option) => (
              <Button
                key={option?.key}
                variant="outline"
                size="sm"
                onClick={() => onShare(option?.key)}
                iconName={option?.icon}
                iconPosition="left"
                iconSize={16}
                className={`bangla-text ${option?.color}`}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;