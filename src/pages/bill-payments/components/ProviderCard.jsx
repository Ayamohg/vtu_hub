import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProviderCard = ({ 
  provider, 
  isSelected = false, 
  onClick = () => {},
  className = '' 
}) => {
  return (
    <div
      onClick={() => onClick(provider)}
      className={`
        p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-border bg-card hover:border-primary/50'
        }
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Provider Logo */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image 
              src={provider?.logo} 
              alt={`${provider?.name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Provider Info */}
          <div>
            <h4 className="font-medium text-foreground">{provider?.name}</h4>
            <p className="text-sm text-muted-foreground">{provider?.type}</p>
            {provider?.processingTime && (
              <p className="text-xs text-muted-foreground">
                ~{provider?.processingTime} processing
              </p>
            )}
          </div>
        </div>

        {/* Status and Selection */}
        <div className="flex items-center space-x-2">
          {/* Status Indicator */}
          <div className={`
            w-2 h-2 rounded-full
            ${provider?.isAvailable ? 'bg-success' : 'bg-error'}
          `} />
          
          {/* Selection Indicator */}
          {isSelected && (
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" />
            </div>
          )}
        </div>
      </div>
      {/* Additional Info */}
      {provider?.features && provider?.features?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {provider?.features?.map((feature, index) => (
            <span 
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderCard;