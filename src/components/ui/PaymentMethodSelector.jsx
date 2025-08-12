import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const PaymentMethodSelector = ({
  isVisible = false,
  onClose = () => {},
  onSelect = () => {},
  selectedMethod = null,
  walletBalance = '₦25,450.00',
  savedCards = [
    {
      id: 'card_1',
      type: 'visa',
      last4: '4532',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: 'card_2',
      type: 'mastercard',
      last4: '8901',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false
    }
  ],
  showWallet = true,
  showCards = true,
  showAddCard = true,
  onAddCard = () => {},
  className = ''
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(selectedMethod);

  if (!isVisible) return null;

  const handleSelect = (method) => {
    setSelectedPaymentMethod(method);
    onSelect(method);
  };

  const getCardIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'verve':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      case 'verve':
        return 'text-green-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <>
      {/* Mobile Modal Overlay */}
      <div className="lg:hidden fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm">
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Select Payment Method</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Modal Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
            <PaymentOptions
              walletBalance={walletBalance}
              savedCards={savedCards}
              selectedPaymentMethod={selectedPaymentMethod}
              onSelect={handleSelect}
              showWallet={showWallet}
              showCards={showCards}
              showAddCard={showAddCard}
              onAddCard={onAddCard}
              getCardIcon={getCardIcon}
              getCardColor={getCardColor}
            />
          </div>
        </div>
      </div>

      {/* Desktop Inline Component */}
      <div className={`hidden lg:block ${className}`}>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-base font-semibold text-foreground mb-4">Payment Method</h3>
          <PaymentOptions
            walletBalance={walletBalance}
            savedCards={savedCards}
            selectedPaymentMethod={selectedPaymentMethod}
            onSelect={handleSelect}
            showWallet={showWallet}
            showCards={showCards}
            showAddCard={showAddCard}
            onAddCard={onAddCard}
            getCardIcon={getCardIcon}
            getCardColor={getCardColor}
          />
        </div>
      </div>
    </>
  );
};

const PaymentOptions = ({
  walletBalance,
  savedCards,
  selectedPaymentMethod,
  onSelect,
  showWallet,
  showCards,
  showAddCard,
  onAddCard,
  getCardIcon,
  getCardColor
}) => {
  return (
    <div className="space-y-3">
      {/* Wallet Balance Option */}
      {showWallet && (
        <div
          onClick={() => onSelect({ type: 'wallet', id: 'wallet' })}
          className={`
            flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200
            ${selectedPaymentMethod?.type === 'wallet'
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${selectedPaymentMethod?.type === 'wallet'
                ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
              }
            `}>
              <Icon name="Wallet" size={20} />
            </div>
            <div>
              <p className="font-medium text-foreground">Wallet Balance</p>
              <p className="text-sm text-muted-foreground">Available balance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono font-semibold text-foreground">{walletBalance}</p>
            {selectedPaymentMethod?.type === 'wallet' && (
              <Icon name="Check" size={16} color="var(--color-primary)" />
            )}
          </div>
        </div>
      )}
      {/* Saved Cards */}
      {showCards && savedCards?.map((card) => (
        <div
          key={card?.id}
          onClick={() => onSelect({ type: 'card', id: card?.id, ...card })}
          className={`
            flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200
            ${selectedPaymentMethod?.id === card?.id
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center
              ${selectedPaymentMethod?.id === card?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
              }
            `}>
              <Icon 
                name={getCardIcon(card?.type)} 
                size={20} 
                className={selectedPaymentMethod?.id === card?.id ? '' : getCardColor(card?.type)}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium text-foreground capitalize">
                  {card?.type} •••• {card?.last4}
                </p>
                {card?.isDefault && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Expires {card?.expiryMonth}/{card?.expiryYear}
              </p>
            </div>
          </div>
          {selectedPaymentMethod?.id === card?.id && (
            <Icon name="Check" size={16} color="var(--color-primary)" />
          )}
        </div>
      ))}
      {/* Add New Card */}
      {showAddCard && (
        <button
          onClick={onAddCard}
          className="flex items-center space-x-3 p-4 border border-dashed border-border hover:border-primary/50 rounded-lg w-full text-left transition-all duration-200 hover:bg-muted/50"
        >
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Icon name="Plus" size={20} color="var(--color-muted-foreground)" />
          </div>
          <div>
            <p className="font-medium text-foreground">Add New Card</p>
            <p className="text-sm text-muted-foreground">Link a new payment method</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default PaymentMethodSelector;