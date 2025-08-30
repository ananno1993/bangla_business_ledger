import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSelector = ({ selectedContact, onContactSelect, contacts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    contact?.phone?.includes(searchTerm)
  );

  const recentContacts = contacts?.filter(contact => contact?.isRecent)?.slice(0, 3);

  const handleContactSelect = (contact) => {
    onContactSelect(contact);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
        যোগাযোগ নির্বাচন করুন *
      </label>
      <Button
        variant="outline"
        size="lg"
        fullWidth
        onClick={() => setIsOpen(true)}
        className="justify-between h-12 text-left"
      >
        <span className={selectedContact ? 'text-foreground' : 'text-muted-foreground'}>
          {selectedContact ? selectedContact?.name : 'একটি যোগাযোগ নির্বাচন করুন'}
        </span>
        <Icon name="ChevronDown" size={20} />
      </Button>
      {/* Contact Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-card w-full max-h-[80vh] rounded-t-xl border-t border-border">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold bangla-text">যোগাযোগ নির্বাচন</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <Input
                type="search"
                placeholder="নাম বা ফোন নম্বর দিয়ে খুঁজুন"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="mb-4"
              />
            </div>

            <div className="overflow-y-auto max-h-96">
              {/* Recent Contacts */}
              {!searchTerm && recentContacts?.length > 0 && (
                <div className="p-4 border-b border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3 bangla-text">
                    সাম্প্রতিক যোগাযোগ
                  </h4>
                  {recentContacts?.map((contact) => (
                    <button
                      key={contact?.id}
                      onClick={() => handleContactSelect(contact)}
                      className="w-full flex items-center p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{contact?.name}</p>
                        <p className="text-sm text-muted-foreground">{contact?.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          contact?.balance >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          ৳{Math.abs(contact?.balance)?.toLocaleString('bn-BD')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contact?.balance >= 0 ? 'পাবো' : 'দিতে হবে'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* All Contacts */}
              <div className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 bangla-text">
                  {searchTerm ? 'অনুসন্ধানের ফলাফল' : 'সকল যোগাযোগ'}
                </h4>
                {filteredContacts?.length > 0 ? (
                  filteredContacts?.map((contact) => (
                    <button
                      key={contact?.id}
                      onClick={() => handleContactSelect(contact)}
                      className="w-full flex items-center p-3 hover:bg-muted rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{contact?.name}</p>
                        <p className="text-sm text-muted-foreground">{contact?.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          contact?.balance >= 0 ? 'text-success' : 'text-error'
                        }`}>
                          ৳{Math.abs(contact?.balance)?.toLocaleString('bn-BD')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {contact?.balance >= 0 ? 'পাবো' : 'দিতে হবে'}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground bangla-text">কোনো যোগাযোগ পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSelector;