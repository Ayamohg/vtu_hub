import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BillPaymentForm = ({ 
  provider, 
  category,
  onSubmit = () => {},
  onBack = () => {},
  isLoading = false,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    customerNumber: '',
    amount: '',
    customerName: '',
    address: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);

  const getFieldsForCategory = (categoryId) => {
    switch (categoryId) {
      case 'electricity':
        return [
          { key: 'customerNumber', label: 'Meter Number', type: 'text', required: true, placeholder: 'Enter meter number' },
          { key: 'amount', label: 'Amount (₦)', type: 'number', required: true, placeholder: '0.00' }
        ];
      case 'cable-tv':
        return [
          { key: 'customerNumber', label: 'Decoder Number', type: 'text', required: true, placeholder: 'Enter decoder number' },
          { key: 'amount', label: 'Package Amount (₦)', type: 'number', required: true, placeholder: '0.00' }
        ];
      case 'internet':
        return [
          { key: 'customerNumber', label: 'Customer ID', type: 'text', required: true, placeholder: 'Enter customer ID' },
          { key: 'amount', label: 'Amount (₦)', type: 'number', required: true, placeholder: '0.00' }
        ];
      case 'water':
        return [
          { key: 'customerNumber', label: 'Customer Number', type: 'text', required: true, placeholder: 'Enter customer number' },
          { key: 'amount', label: 'Amount (₦)', type: 'number', required: true, placeholder: '0.00' }
        ];
      default:
        return [
          { key: 'customerNumber', label: 'Customer Number', type: 'text', required: true, placeholder: 'Enter customer number' },
          { key: 'amount', label: 'Amount (₦)', type: 'number', required: true, placeholder: '0.00' }
        ];
    }
  };

  const packageOptions = [
    { value: 'basic', label: 'Basic Package - ₦2,500' },
    { value: 'family', label: 'Family Package - ₦4,200' },
    { value: 'premium', label: 'Premium Package - ₦6,800' },
    { value: 'ultimate', label: 'Ultimate Package - ₦12,000' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleVerifyCustomer = async () => {
    if (!formData?.customerNumber) {
      setErrors({ customerNumber: 'Customer number is required' });
      return;
    }

    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setCustomerDetails({
        name: 'Adebayo Johnson',
        address: '15 Ikeja Street, Lagos State',
        accountType: 'Prepaid',
        lastPayment: '2025-01-05',
        outstandingBalance: '₦0.00'
      });
      setIsVerifying(false);
    }, 2000);
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = getFieldsForCategory(category?.id);

    fields?.forEach(field => {
      if (field?.required && !formData?.[field?.key]) {
        newErrors[field.key] = `${field?.label} is required`;
      }
    });

    if (formData?.amount && parseFloat(formData?.amount) < 100) {
      newErrors.amount = 'Minimum amount is ₦100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        provider: provider?.name,
        category: category?.name,
        customerDetails
      });
    }
  };

  const fields = getFieldsForCategory(category?.id);

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Pay {category?.name} Bill</h2>
            <p className="text-sm text-muted-foreground">{provider?.name}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dynamic Form Fields */}
        {fields?.map((field) => (
          <div key={field?.key}>
            {field?.key === 'amount' && category?.id === 'cable-tv' ? (
              <Select
                label="Select Package"
                options={packageOptions}
                value={formData?.package}
                onChange={(value) => {
                  handleInputChange('package', value);
                  const selectedPackage = packageOptions?.find(p => p?.value === value);
                  if (selectedPackage) {
                    const amount = selectedPackage?.label?.match(/₦([\d,]+)/)?.[1]?.replace(',', '') || '';
                    handleInputChange('amount', amount);
                  }
                }}
                error={errors?.package}
                required={field?.required}
              />
            ) : (
              <Input
                label={field?.label}
                type={field?.type}
                placeholder={field?.placeholder}
                value={formData?.[field?.key]}
                onChange={(e) => handleInputChange(field?.key, e?.target?.value)}
                error={errors?.[field?.key]}
                required={field?.required}
              />
            )}
          </div>
        ))}

        {/* Verify Customer Button */}
        {formData?.customerNumber && !customerDetails && (
          <Button
            type="button"
            variant="outline"
            onClick={handleVerifyCustomer}
            loading={isVerifying}
            className="w-full"
          >
            Verify Customer Details
          </Button>
        )}

        {/* Customer Details Display */}
        {customerDetails && (
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">Customer Verified</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium text-foreground">{customerDetails?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium text-foreground text-right">{customerDetails?.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium text-foreground">{customerDetails?.accountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Outstanding:</span>
                <span className="font-medium text-foreground">{customerDetails?.outstandingBalance}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Summary */}
        {formData?.amount && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium text-foreground">{category?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-medium text-foreground">{provider?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-mono font-semibold text-foreground">₦{parseFloat(formData?.amount || 0)?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee:</span>
                <span className="font-mono font-medium text-foreground">₦50</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Total:</span>
                <span className="font-mono font-bold text-primary">₦{(parseFloat(formData?.amount || 0) + 50)?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          disabled={!customerDetails || !formData?.amount}
          className="w-full"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
};

export default BillPaymentForm;