import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PhoneNumberInput = ({ 
  value, 
  onChange, 
  selectedProvider,
  recentRecipients = [],
  onRecipientSelect,
  className = '' 
}) => {
  const [showRecents, setShowRecents] = useState(false);

  const validateNigerianPhone = (phone) => {
    const cleanPhone = phone?.replace(/\D/g, '');
    const nigerianPattern = /^(0[789][01]\d{8}|[789][01]\d{8})$/;
    return nigerianPattern?.test(cleanPhone);
  };

  const formatPhoneNumber = (phone) => {
    const cleanPhone = phone?.replace(/\D/g, '');
    if (cleanPhone?.length <= 4) return cleanPhone;
    if (cleanPhone?.length <= 7) return `${cleanPhone?.slice(0, 4)} ${cleanPhone?.slice(4)}`;
    if (cleanPhone?.length <= 11) return `${cleanPhone?.slice(0, 4)} ${cleanPhone?.slice(4, 7)} ${cleanPhone?.slice(7)}`;
    return `${cleanPhone?.slice(0, 4)} ${cleanPhone?.slice(4, 7)} ${cleanPhone?.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    onChange(formatted);
  };

  const isValid = validateNigerianPhone(value);
  const error = value && !isValid ? 'Please enter a valid Nigerian phone number' : '';

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="0801 234 5678"
          value={value}
          onChange={handlePhoneChange}
          error={error}
          required
          description={selectedProvider ? `${selectedProvider?.name} number` : 'Enter recipient phone number'}
        />
        
        {recentRecipients?.length > 0 && (
          <button
            type="button"
            onClick={() => setShowRecents(!showRecents)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
          >
            <Icon name="Clock" size={16} />
          </button>
        )}
      </div>
      {/* Recent Recipients */}
      {showRecents && recentRecipients?.length > 0 && (
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm font-medium text-foreground mb-2">Recent Recipients</p>
          <div className="flex flex-wrap gap-2">
            {recentRecipients?.slice(0, 6)?.map((recipient, index) => (
              <button
                key={index}
                onClick={() => {
                  onRecipientSelect(recipient);
                  setShowRecents(false);
                }}
                className="flex items-center space-x-2 bg-card border border-border rounded-lg px-3 py-2 text-sm hover:border-primary/50 transition-colors"
              >
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {recipient?.name ? recipient?.name?.charAt(0)?.toUpperCase() : recipient?.phone?.charAt(1)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{recipient?.name || 'Unknown'}</p>
                  <p className="text-xs text-muted-foreground">{recipient?.phone}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberInput;