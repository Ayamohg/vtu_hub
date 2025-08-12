import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionSummary = ({ 
  selectedProvider,
  phoneNumber,
  serviceType,
  selectedAmount,
  selectedBundle,
  onPurchase,
  isProcessing = false,
  walletBalance = '₦25,450.00',
  className = '' 
}) => {
  if (!selectedProvider || !phoneNumber || (!selectedAmount && !selectedBundle)) {
    return null;
  }

  const serviceFee = 0; // No service fee for VTU
  const amount = selectedAmount || selectedBundle?.price || 0;
  const total = amount + serviceFee;

  const canAfford = parseFloat(walletBalance?.replace(/[₦,]/g, '')) >= total;

  const getServiceDetails = () => {
    if (serviceType === 'airtime') {
      return {
        title: 'Airtime Purchase',
        description: `₦${amount?.toLocaleString()} airtime`,
        icon: 'Smartphone'
      };
    } else {
      return {
        title: 'Data Bundle',
        description: `${selectedBundle?.data} - ${selectedBundle?.validity}`,
        icon: 'Wifi'
      };
    }
  };

  const service = getServiceDetails();

  return (
    <div className={`bg-card border border-border rounded-lg p-6 space-y-6 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Receipt" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Transaction Summary</h3>
          <p className="text-sm text-muted-foreground">Review your purchase details</p>
        </div>
      </div>
      {/* Service Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Icon name={service?.icon} size={16} />
            </div>
            <div>
              <p className="font-medium text-foreground">{service?.title}</p>
              <p className="text-sm text-muted-foreground">{service?.description}</p>
            </div>
          </div>
          <span className="font-semibold text-foreground">₦{amount?.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <img 
                src={selectedProvider?.logo} 
                alt={selectedProvider?.name}
                className="w-5 h-5 object-cover rounded"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedProvider?.name}</p>
              <p className="text-sm text-muted-foreground">{phoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 text-sm">
          <span className="text-muted-foreground">Service Fee</span>
          <span className="text-foreground">₦{serviceFee?.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-border">
          <span className="font-semibold text-foreground">Total Amount</span>
          <span className="font-bold text-lg text-foreground">₦{total?.toLocaleString()}</span>
        </div>
      </div>
      {/* Wallet Balance */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Wallet" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Wallet Balance</span>
          </div>
          <span className="font-mono font-semibold text-foreground">{walletBalance}</span>
        </div>
        
        {!canAfford && (
          <div className="mt-3 flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={14} />
            <span className="text-sm">Insufficient balance. Please fund your wallet.</span>
          </div>
        )}
      </div>
      {/* Purchase Button */}
      <Button
        onClick={onPurchase}
        disabled={!canAfford || isProcessing}
        loading={isProcessing}
        fullWidth
        className="h-12 text-base font-semibold"
      >
        {isProcessing ? 'Processing...' : `Purchase for ₦${total?.toLocaleString()}`}
      </Button>
      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center">
        By proceeding, you agree to our terms and conditions. 
        Transaction is final and non-refundable.
      </p>
    </div>
  );
};

export default TransactionSummary;