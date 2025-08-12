import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PaymentMethodSelector from '../../../components/ui/PaymentMethodSelector';

const PurchaseModal = ({ 
  isVisible = false,
  onClose = () => {},
  selectedPackage = null,
  selectedGame = null,
  onConfirmPurchase = () => {}
}) => {
  const [step, setStep] = useState(1); // 1: Account Link, 2: Payment, 3: Confirmation
  const [gamingAccount, setGamingAccount] = useState('');
  const [accountPlatform, setAccountPlatform] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isVisible || !selectedPackage) return null;

  const platformOptions = [
    { value: 'activision', label: 'Activision Account' },
    { value: 'battlenet', label: 'Battle.net' },
    { value: 'steam', label: 'Steam' },
    { value: 'xbox', label: 'Xbox Live' },
    { value: 'playstation', label: 'PlayStation Network' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const formatPoints = (points) => {
    return new Intl.NumberFormat('en-NG')?.format(points);
  };

  const handleNext = () => {
    if (step === 1 && gamingAccount && accountPlatform) {
      setStep(2);
    } else if (step === 2 && paymentMethod) {
      setStep(3);
    }
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      onConfirmPurchase({
        package: selectedPackage,
        game: selectedGame,
        gamingAccount,
        accountPlatform,
        paymentMethod
      });
      setIsProcessing(false);
      onClose();
      // Reset state
      setStep(1);
      setGamingAccount('');
      setAccountPlatform('');
      setPaymentMethod(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Purchase {selectedGame?.title}</h2>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Package Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  {formatPoints(selectedPackage?.points)} COD Points
                </h3>
                {selectedPackage?.bonusPoints > 0 && (
                  <p className="text-sm text-success">
                    +{formatPoints(selectedPackage?.bonusPoints)} Bonus Points
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {formatPrice(selectedPackage?.price)}
                </div>
              </div>
            </div>
          </div>

          {/* Step 1: Account Linking */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Link Gaming Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your gaming account details to receive the COD Points directly.
                </p>
              </div>

              <Select
                label="Gaming Platform"
                options={platformOptions}
                value={accountPlatform}
                onChange={setAccountPlatform}
                placeholder="Select your platform"
                required
              />

              <Input
                label="Gaming Account ID/Username"
                type="text"
                placeholder="Enter your account username or ID"
                value={gamingAccount}
                onChange={(e) => setGamingAccount(e?.target?.value)}
                description="This is where your COD Points will be delivered"
                required
              />

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-warning">Important</p>
                    <p className="text-muted-foreground">
                      Make sure your account details are correct. COD Points cannot be transferred once delivered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Payment Method</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose how you'd like to pay for your COD Points.
                </p>
              </div>

              <PaymentMethodSelector
                isVisible={true}
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
                className="border-0 p-0 bg-transparent"
              />
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Confirm Purchase</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please review your order details before confirming.
                </p>
              </div>

              {/* Order Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Game:</span>
                  <span className="font-medium text-foreground">{selectedGame?.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Package:</span>
                  <span className="font-medium text-foreground">
                    {formatPoints(selectedPackage?.points)} Points
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform:</span>
                  <span className="font-medium text-foreground capitalize">
                    {platformOptions?.find(p => p?.value === accountPlatform)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Account:</span>
                  <span className="font-medium text-foreground">{gamingAccount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment:</span>
                  <span className="font-medium text-foreground">
                    {paymentMethod?.type === 'wallet' ? 'Wallet Balance' : `Card •••• ${paymentMethod?.last4}`}
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-foreground">{formatPrice(selectedPackage?.price)}</span>
                </div>
              </div>

              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Zap" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-success">Instant Delivery</p>
                    <p className="text-muted-foreground">
                      Your COD Points will be delivered to your account within 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            disabled={isProcessing}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            variant="default"
            onClick={step === 3 ? handleConfirmPurchase : handleNext}
            disabled={
              isProcessing ||
              (step === 1 && (!gamingAccount || !accountPlatform)) ||
              (step === 2 && !paymentMethod)
            }
            loading={isProcessing}
          >
            {step === 3 ? 'Confirm Purchase' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;