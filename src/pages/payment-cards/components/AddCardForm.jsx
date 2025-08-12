import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddCardForm = ({ 
  isVisible = false, 
  onClose = () => {}, 
  onSubmit = () => {},
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    nickname: '',
    bank: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    dailyLimit: '100000',
    enableThreeDSecure: true
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Card Details, 2: Billing, 3: Security

  const nigerianBanks = [
    { value: 'gtbank', label: 'Guaranty Trust Bank (GTBank)' },
    { value: 'access', label: 'Access Bank' },
    { value: 'zenith', label: 'Zenith Bank' },
    { value: 'uba', label: 'United Bank for Africa (UBA)' },
    { value: 'firstbank', label: 'First Bank of Nigeria' },
    { value: 'fidelity', label: 'Fidelity Bank' },
    { value: 'union', label: 'Union Bank' },
    { value: 'sterling', label: 'Sterling Bank' },
    { value: 'wema', label: 'Wema Bank' },
    { value: 'polaris', label: 'Polaris Bank' }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const currentYear = new Date()?.getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(currentYear + i)?.slice(-2),
    label: String(currentYear + i)
  }));

  const nigerianStates = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Federal Capital Territory (Abuja)' },
    { value: 'kano', label: 'Kano' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'oyo', label: 'Oyo' },
    { value: 'kaduna', label: 'Kaduna' },
    { value: 'ogun', label: 'Ogun' },
    { value: 'imo', label: 'Imo' },
    { value: 'plateau', label: 'Plateau' },
    { value: 'akwa-ibom', label: 'Akwa Ibom' }
  ];

  const handleInputChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData?.cardNumber?.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData?.cardNumber?.replace(/\s/g, '')?.length < 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!formData?.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
      if (!formData?.expiryYear) newErrors.expiryYear = 'Expiry year is required';
      if (!formData?.cvv) newErrors.cvv = 'CVV is required';
      if (!formData?.holderName?.trim()) newErrors.holderName = 'Cardholder name is required';
      if (!formData?.bank) newErrors.bank = 'Please select your bank';
    }
    
    if (stepNumber === 2) {
      if (!formData?.billingAddress?.street?.trim()) newErrors['billingAddress.street'] = 'Street address is required';
      if (!formData?.billingAddress?.city?.trim()) newErrors['billingAddress.city'] = 'City is required';
      if (!formData?.billingAddress?.state) newErrors['billingAddress.state'] = 'State is required';
      if (!formData?.billingAddress?.zipCode?.trim()) newErrors['billingAddress.zipCode'] = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-4 lg:inset-8 bg-card rounded-2xl shadow-modal overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Add New Card</h2>
              <p className="text-sm text-muted-foreground">
                Step {step} of 3 - {step === 1 ? 'Card Details' : step === 2 ? 'Billing Address' : 'Security Settings'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-muted/30">
          <div className="flex items-center space-x-2">
            {[1, 2, 3]?.map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${stepNum <= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {stepNum < step ? <Icon name="Check" size={16} /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`
                    flex-1 h-1 rounded-full
                    ${stepNum < step ? 'bg-primary' : 'bg-muted'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Card Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-2">
                    <Input
                      label="Card Number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData?.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
                      error={errors?.cardNumber}
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <Input
                    label="Cardholder Name"
                    type="text"
                    placeholder="John Doe"
                    value={formData?.holderName}
                    onChange={(e) => handleInputChange('holderName', e?.target?.value?.toUpperCase())}
                    error={errors?.holderName}
                    required
                  />
                  
                  <Select
                    label="Issuing Bank"
                    placeholder="Select your bank"
                    options={nigerianBanks}
                    value={formData?.bank}
                    onChange={(value) => handleInputChange('bank', value)}
                    error={errors?.bank}
                    searchable
                    required
                  />
                  
                  <Select
                    label="Expiry Month"
                    placeholder="MM"
                    options={monthOptions}
                    value={formData?.expiryMonth}
                    onChange={(value) => handleInputChange('expiryMonth', value)}
                    error={errors?.expiryMonth}
                    required
                  />
                  
                  <Select
                    label="Expiry Year"
                    placeholder="YY"
                    options={yearOptions}
                    value={formData?.expiryYear}
                    onChange={(value) => handleInputChange('expiryYear', value)}
                    error={errors?.expiryYear}
                    required
                  />
                  
                  <div className="lg:col-span-2">
                    <Input
                      label="CVV"
                      type="password"
                      placeholder="123"
                      value={formData?.cvv}
                      onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.slice(0, 4))}
                      error={errors?.cvv}
                      maxLength={4}
                      description="3 or 4 digit security code on the back of your card"
                      required
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <Input
                      label="Card Nickname (Optional)"
                      type="text"
                      placeholder="My Primary Card"
                      value={formData?.nickname}
                      onChange={(e) => handleInputChange('nickname', e?.target?.value)}
                      description="Give your card a memorable name"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Billing Address */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-2">
                    <Input
                      label="Street Address"
                      type="text"
                      placeholder="123 Main Street"
                      value={formData?.billingAddress?.street}
                      onChange={(e) => handleInputChange('billingAddress.street', e?.target?.value)}
                      error={errors?.['billingAddress.street']}
                      required
                    />
                  </div>
                  
                  <Input
                    label="City"
                    type="text"
                    placeholder="Lagos"
                    value={formData?.billingAddress?.city}
                    onChange={(e) => handleInputChange('billingAddress.city', e?.target?.value)}
                    error={errors?.['billingAddress.city']}
                    required
                  />
                  
                  <Select
                    label="State"
                    placeholder="Select state"
                    options={nigerianStates}
                    value={formData?.billingAddress?.state}
                    onChange={(value) => handleInputChange('billingAddress.state', value)}
                    error={errors?.['billingAddress.state']}
                    searchable
                    required
                  />
                  
                  <div className="lg:col-span-2">
                    <Input
                      label="ZIP/Postal Code"
                      type="text"
                      placeholder="100001"
                      value={formData?.billingAddress?.zipCode}
                      onChange={(e) => handleInputChange('billingAddress.zipCode', e?.target?.value)}
                      error={errors?.['billingAddress.zipCode']}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security Settings */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="lg:col-span-2">
                    <Input
                      label="Daily Spending Limit"
                      type="number"
                      placeholder="100000"
                      value={formData?.dailyLimit}
                      onChange={(e) => handleInputChange('dailyLimit', e?.target?.value)}
                      description="Maximum amount you can spend per day (₦)"
                    />
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} color="var(--color-success)" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">3D Secure Authentication</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Enhanced security for online transactions. You'll receive SMS or app notifications for verification.
                      </p>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData?.enableThreeDSecure}
                          onChange={(e) => handleInputChange('enableThreeDSecure', e?.target?.checked)}
                          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-foreground">
                          Enable 3D Secure (Recommended)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Security Notice</h4>
                      <p className="text-sm text-muted-foreground">
                        Your card details are encrypted and stored securely. We comply with PCI DSS standards and Nigerian banking regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                iconName="ChevronLeft"
                iconPosition="left"
                disabled={isLoading}
              >
                Back
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            
            {step < 3 ? (
              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
                disabled={isLoading}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleSubmit}
                loading={isLoading}
                iconName="CreditCard"
                iconPosition="left"
              >
                Add Card
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;