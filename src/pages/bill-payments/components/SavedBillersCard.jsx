import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SavedBillersCard = ({ 
  savedBillers = [],
  onQuickPay = () => {},
  onManage = () => {},
  className = '' 
}) => {
  if (savedBillers?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bookmark" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-medium text-foreground mb-2">No Saved Billers</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Save frequently used billers for quick payments
        </p>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Biller
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} color="var(--color-primary)" />
          <h3 className="font-medium text-foreground">Saved Billers</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onManage}>
          <Icon name="Settings" size={16} className="mr-1" />
          Manage
        </Button>
      </div>
      {/* Saved Billers List */}
      <div className="p-4 space-y-3">
        {savedBillers?.map((biller) => (
          <div
            key={biller?.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {/* Provider Logo */}
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                <Image 
                  src={biller?.providerLogo} 
                  alt={`${biller?.providerName} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Biller Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground truncate">{biller?.nickname}</h4>
                  {biller?.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex-shrink-0">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {biller?.providerName} • {biller?.customerNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last paid: {biller?.lastPayment}
                </p>
              </div>
            </div>

            {/* Quick Pay Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickPay(biller)}
              className="ml-2 flex-shrink-0"
            >
              <Icon name="Zap" size={14} className="mr-1" />
              Pay
            </Button>
          </div>
        ))}
      </div>
      {/* Add New Biller */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full">
          <Icon name="Plus" size={16} className="mr-2" />
          Add New Biller
        </Button>
      </div>
    </div>
  );
};

export default SavedBillersCard;