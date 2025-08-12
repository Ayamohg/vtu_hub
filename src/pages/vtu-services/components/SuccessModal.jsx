import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ 
  isVisible = false,
  onClose,
  transactionData = {},
  onDownloadReceipt,
  onShareReceipt,
  className = '' 
}) => {
  if (!isVisible) return null;

  const {
    transactionId = 'VTU' + Date.now(),
    provider = { name: 'MTN' },
    phoneNumber = '0801 234 5678',
    serviceType = 'airtime',
    amount = 1000,
    timestamp = new Date()
  } = transactionData;

  return (
    <div className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-card rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Success Header */}
        <div className="text-center p-6 border-b border-border">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Transaction Successful!</h2>
          <p className="text-muted-foreground">
            Your {serviceType} purchase has been completed successfully
          </p>
        </div>

        {/* Transaction Details */}
        <div className="p-6 space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-sm font-medium text-foreground">{transactionId}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-medium text-foreground">{provider?.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Phone Number</span>
              <span className="text-sm font-medium text-foreground">{phoneNumber}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Service</span>
              <span className="text-sm font-medium text-foreground capitalize">{serviceType}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-lg font-bold text-foreground">₦{amount?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date & Time</span>
              <span className="text-sm font-medium text-foreground">
                {timestamp?.toLocaleDateString('en-GB')} {timestamp?.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>

          {/* Status Message */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} color="var(--color-success)" className="mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-success mb-1">Transaction Completed</p>
                <p className="text-success/80">
                  {serviceType === 'airtime' 
                    ? `₦${amount?.toLocaleString()} airtime has been credited to ${phoneNumber}`
                    : `Data bundle has been activated on ${phoneNumber}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onDownloadReceipt}
              iconName="Download"
              iconPosition="left"
            >
              Download
            </Button>
            
            <Button
              variant="outline"
              onClick={onShareReceipt}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
          
          <Button
            onClick={onClose}
            fullWidth
            className="h-12"
          >
            Continue
          </Button>
        </div>

        {/* Referral Message */}
        <div className="px-6 pb-6">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <Icon name="Gift" size={20} color="var(--color-primary)" className="mx-auto mb-2" />
            <p className="text-sm text-primary font-medium mb-1">Earn with Referrals!</p>
            <p className="text-xs text-primary/80">
              Share VTU Hub with friends and earn ₦50 for each successful referral
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;