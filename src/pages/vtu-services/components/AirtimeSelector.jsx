import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AirtimeSelector = ({ 
  selectedAmount, 
  onAmountSelect, 
  customAmount, 
  onCustomAmountChange,
  className = '' 
}) => {
  const [showCustom, setShowCustom] = useState(false);

  const presetAmounts = [
    { value: 100, label: '₦100' },
    { value: 200, label: '₦200' },
    { value: 500, label: '₦500' },
    { value: 1000, label: '₦1,000' },
    { value: 2000, label: '₦2,000' },
    { value: 5000, label: '₦5,000' }
  ];

  const handlePresetSelect = (amount) => {
    onAmountSelect(amount);
    setShowCustom(false);
  };

  const handleCustomAmountChange = (e) => {
    const value = parseInt(e?.target?.value) || 0;
    onCustomAmountChange(value);
    if (value > 0) {
      onAmountSelect(value);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="text-base font-semibold text-foreground">Select Amount</h4>
      {/* Preset Amounts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {presetAmounts?.map((preset) => (
          <Button
            key={preset?.value}
            variant={selectedAmount === preset?.value ? "default" : "outline"}
            onClick={() => handlePresetSelect(preset?.value)}
            className="h-12 text-base font-semibold"
          >
            {preset?.label}
          </Button>
        ))}
      </div>
      {/* Custom Amount Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Need a different amount?</span>
        <Button
          variant="ghost"
          onClick={() => setShowCustom(!showCustom)}
          className="text-primary hover:text-primary/80"
        >
          {showCustom ? 'Hide Custom' : 'Enter Custom Amount'}
        </Button>
      </div>
      {/* Custom Amount Input */}
      {showCustom && (
        <div className="bg-muted rounded-lg p-4">
          <Input
            label="Custom Amount"
            type="number"
            placeholder="Enter amount"
            value={customAmount || ''}
            onChange={handleCustomAmountChange}
            min="50"
            max="50000"
            description="Minimum: ₦50, Maximum: ₦50,000"
          />
        </div>
      )}
      {/* Amount Validation */}
      {selectedAmount > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-medium text-success">
              Selected: ₦{selectedAmount?.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirtimeSelector;