import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CODPointsPackage = ({ 
  package: pkg, 
  onPurchase = () => {},
  isPopular = false 
}) => {
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

  return (
    <div className={`
      relative bg-card border rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
      ${isPopular ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/50'}
    `}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </div>
        </div>
      )}
      {/* Limited Time Badge */}
      {pkg?.isLimitedTime && (
        <div className="absolute top-3 right-3 bg-error text-error-foreground px-2 py-1 rounded text-xs font-medium">
          Limited Time
        </div>
      )}
      {/* Package Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
          <Icon name="Coins" size={32} color="white" />
        </div>
      </div>
      {/* Points Amount */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-foreground">
          {formatPoints(pkg?.points)}
        </h3>
        <p className="text-sm text-muted-foreground">COD Points</p>
      </div>
      {/* Bonus Points */}
      {pkg?.bonusPoints > 0 && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
            <Icon name="Plus" size={14} className="mr-1" />
            +{formatPoints(pkg?.bonusPoints)} Bonus
          </div>
        </div>
      )}
      {/* Bonus Percentage */}
      {pkg?.bonusPercentage > 0 && (
        <div className="text-center mb-4">
          <span className="inline-block bg-warning/10 text-warning px-2 py-1 rounded text-xs font-medium">
            +{pkg?.bonusPercentage}% Extra
          </span>
        </div>
      )}
      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-foreground">
          {formatPrice(pkg?.price)}
        </div>
        {pkg?.originalPrice && pkg?.originalPrice > pkg?.price && (
          <div className="text-sm text-muted-foreground line-through">
            {formatPrice(pkg?.originalPrice)}
          </div>
        )}
      </div>
      {/* Features */}
      {pkg?.features && pkg?.features?.length > 0 && (
        <div className="mb-6">
          <ul className="space-y-2">
            {pkg?.features?.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={14} color="var(--color-success)" className="mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Purchase Button */}
      <Button
        variant={isPopular ? "default" : "outline"}
        fullWidth
        onClick={() => onPurchase(pkg)}
        className="font-medium"
      >
        Purchase Now
      </Button>
      {/* Delivery Info */}
      <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
        <Icon name="Zap" size={12} className="mr-1" />
        <span>Instant delivery</span>
      </div>
    </div>
  );
};

export default CODPointsPackage;