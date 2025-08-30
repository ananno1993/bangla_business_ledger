import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PhotoAttachment = ({ attachedPhoto, onPhotoAttach, onPhotoRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoCapture = () => {
    // Simulate camera capture
    const mockPhoto = {
      id: Date.now(),
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      name: `receipt_${Date.now()}.jpg`,
      size: '2.3 MB',
      timestamp: new Date()
    };
    onPhotoAttach(mockPhoto);
    setIsModalOpen(false);
  };

  const handleGallerySelect = () => {
    // Simulate gallery selection
    const mockPhoto = {
      id: Date.now(),
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
      name: `document_${Date.now()}.jpg`,
      size: '1.8 MB',
      timestamp: new Date()
    };
    onPhotoAttach(mockPhoto);
    setIsModalOpen(false);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
        রসিদ/ছবি (ঐচ্ছিক)
      </label>
      {!attachedPhoto ? (
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => setIsModalOpen(true)}
          iconName="Camera"
          iconPosition="left"
          className="h-12 bangla-text border-dashed"
        >
          ছবি যোগ করুন
        </Button>
      ) : (
        <div className="border border-border rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <Image
                src={attachedPhoto?.url}
                alt="Attached receipt"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{attachedPhoto?.name}</p>
              <p className="text-xs text-muted-foreground">{attachedPhoto?.size}</p>
              <p className="text-xs text-muted-foreground">
                {attachedPhoto?.timestamp?.toLocaleString('bn-BD')}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onPhotoRemove}
              className="text-error hover:text-error hover:bg-error/10"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Photo Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-card w-full rounded-t-xl border-t border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold bangla-text">ছবি যোগ করুন</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handlePhotoCapture}
                iconName="Camera"
                iconPosition="left"
                className="justify-start bangla-text"
              >
                ক্যামেরা দিয়ে ছবি তুলুন
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleGallerySelect}
                iconName="Image"
                iconPosition="left"
                className="justify-start bangla-text"
              >
                গ্যালারি থেকে নির্বাচন করুন
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                fullWidth
                onClick={() => setIsModalOpen(false)}
                className="bangla-text"
              >
                বাতিল
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAttachment;