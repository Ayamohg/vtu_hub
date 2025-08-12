import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CardDisplay = ({ 
  card, 
  isDefault = false, 
  onSetDefault = () => {}, 
  onEdit = () => {}, 
  onRemove = () => {},
  className = '' 
}) => {
  const getCardBrandIcon = (type) => {
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

  const getCardBrandColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'visa':
        return 'from-blue-600 to-blue-800';
      case 'mastercard':
        return 'from-red-600 to-red-800';
      case 'verve':
        return 'from-green-600 to-green-800';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getBankLogo = (bank) => {
    // Mock bank logos - in real app these would be actual bank logos
    const bankLogos = {
      'gtbank': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop',
      'access': 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&h=60&fit=crop',
      'zenith': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop',
      'uba': 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=60&fit=crop',
      'firstbank': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=60&fit=crop'
    };
    return bankLogos?.[bank?.toLowerCase()] || bankLogos?.['gtbank'];
  };

  return (
    <div className={`relative ${className}`}>
      {/* Card Visual */}
      <div className={`
        relative w-full h-48 sm:h-52 rounded-2xl p-6 text-white shadow-lg
        bg-gradient-to-br ${getCardBrandColor(card?.type)}
        transform transition-all duration-300 hover:scale-105 hover:shadow-xl
      `}>
        {/* Default Badge */}
        {isDefault && (
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-xs font-medium">Default</span>
          </div>
        )}

        {/* Bank Logo */}
        <div className="absolute top-4 left-4 w-12 h-8 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
          <img 
            src={getBankLogo(card?.bank)} 
            alt={`${card?.bank} logo`}
            className="w-8 h-5 object-contain rounded"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>

        {/* Card Number */}
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
          <div className="font-mono text-lg sm:text-xl tracking-wider">
            •••• •••• •••• {card?.last4}
          </div>
        </div>

        {/* Card Details */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <p className="text-xs opacity-80 mb-1">CARDHOLDER</p>
            <p className="font-medium text-sm sm:text-base">{card?.holderName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80 mb-1">EXPIRES</p>
            <p className="font-mono text-sm">{card?.expiryMonth}/{card?.expiryYear}</p>
          </div>
        </div>

        {/* Card Brand Icon */}
        <div className="absolute bottom-6 right-6">
          <Icon name={getCardBrandIcon(card?.type)} size={32} color="white" />
        </div>
      </div>
      {/* Card Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {!isDefault && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSetDefault(card?.id)}
            iconName="Star"
            iconPosition="left"
            iconSize={14}
          >
            Set Default
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(card?.id)}
          iconName="Edit"
          iconPosition="left"
          iconSize={14}
        >
          Edit
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(card?.id)}
          iconName="Trash2"
          iconPosition="left"
          iconSize={14}
          className="text-error hover:text-error"
        >
          Remove
        </Button>
      </div>
      {/* Card Info */}
      <div className="mt-3 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nickname:</span>
          <span className="font-medium text-foreground">{card?.nickname || 'No nickname'}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">Daily Limit:</span>
          <span className="font-mono font-medium text-foreground">₦{card?.dailyLimit?.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted-foreground">3D Secure:</span>
          <div className="flex items-center space-x-1">
            <Icon 
              name={card?.threeDSecure ? "Shield" : "ShieldOff"} 
              size={14} 
              color={card?.threeDSecure ? "var(--color-success)" : "var(--color-warning)"} 
            />
            <span className={`text-xs ${card?.threeDSecure ? 'text-success' : 'text-warning'}`}>
              {card?.threeDSecure ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;