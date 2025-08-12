import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const QuickPayModal = ({ 
  isVisible = false,
  biller = null,
  onClose = () => {},
  onPay = () => {},
  isLoading = false,
  className = '' 
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isVisible || !biller) return null;

  const handleAmountChange = (e) => {
    const value = e?.target?.value;
    setAmount(value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!amount || parseFloat(amount) < 100) {
      setError('Minimum amount is ₦100');
      return;
    }

    onPay({
      billerId: biller?.id,
      amount: parseFloat(amount),
      customerNumber: biller?.customerNumber,
      providerName: biller?.providerName
    });
  };

  const suggestedAmounts = [1000, 2500, 5000, 10000];

  return (
    <>
      {/* Mobile Modal Overlay */}
      <div className="lg:hidden fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm">
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Quick Pay</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
            <QuickPayContent
              biller={biller}
              amount={amount}
              error={error}
              suggestedAmounts={suggestedAmounts}
              onAmountChange={handleAmountChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Desktop Modal */}
      <div className="hidden lg:block fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Quick Pay</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <QuickPayContent
                biller={biller}
                amount={amount}
                error={error}
                suggestedAmounts={suggestedAmounts}
                onAmountChange={handleAmountChange}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const QuickPayContent = ({
  biller,
  amount,
  error,
  suggestedAmounts,
  onAmountChange,
  onSubmit,
  isLoading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Biller Info */}
      <div className="flex items-center space-x-3 p-4 bg-muted/50 rounded-lg">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          <Image 
            src={biller?.providerLogo} 
            alt={`${biller?.providerName} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{biller?.nickname}</h4>
          <p className="text-sm text-muted-foreground">
            {biller?.providerName} • {biller?.customerNumber}
          </p>
          <p className="text-xs text-muted-foreground">
            Last paid: {biller?.lastPayment}
          </p>
        </div>
      </div>
      {/* Amount Input */}
      <div>
        <Input
          label="Amount (₦)"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={onAmountChange}
          error={error}
          required
        />
      </div>
      {/* Suggested Amounts */}
      <div>
        <p className="text-sm font-medium text-foreground mb-3">Quick amounts:</p>
        <div className="grid grid-cols-2 gap-2">
          {suggestedAmounts?.map((suggestedAmount) => (
            <Button
              key={suggestedAmount}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onAmountChange({ target: { value: suggestedAmount?.toString() } })}
              className="font-mono"
            >
              ₦{suggestedAmount?.toLocaleString()}
            </Button>
          ))}
        </div>
      </div>
      {/* Payment Summary */}
      {amount && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">Payment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-mono font-medium text-foreground">₦{parseFloat(amount || 0)?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee:</span>
              <span className="font-mono font-medium text-foreground">₦50</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total:</span>
              <span className="font-mono font-bold text-primary">₦{(parseFloat(amount || 0) + 50)?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        disabled={!amount || parseFloat(amount) < 100}
        className="w-full"
      >
        Pay Now
      </Button>
    </form>
  );
};

export default QuickPayModal;