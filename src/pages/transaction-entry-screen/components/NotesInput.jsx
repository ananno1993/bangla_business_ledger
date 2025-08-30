import React, { useState } from 'react';

const NotesInput = ({ notes, onNotesChange }) => {
  const [charCount, setCharCount] = useState(notes?.length || 0);
  const maxChars = 200;

  const handleNotesChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      onNotesChange(value);
      setCharCount(value?.length);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-2 bangla-text">
        বিস্তারিত (ঐচ্ছিক)
      </label>
      
      <div className="relative">
        <textarea
          value={notes || ''}
          onChange={handleNotesChange}
          placeholder="লেনদেন সম্পর্কে কোনো বিস্তারিত তথ্য লিখুন..."
          className="w-full h-24 px-3 py-2 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
          rows={3}
        />
        
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          {charCount}/{maxChars}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-1 bangla-text">
        উদাহরণ: দোকানের জন্য চাল কিনেছি, বেতন দিয়েছি, ইত্যাদি
      </p>
    </div>
  );
};

export default NotesInput;