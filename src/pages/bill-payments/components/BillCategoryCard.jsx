import React from 'react';
import Icon from '../../../components/AppIcon';

const BillCategoryCard = ({ 
  category, 
  isSelected = false, 
  onClick = () => {},
  className = '' 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'maintenance':
        return 'text-warning';
      case 'unavailable':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'maintenance':
        return 'AlertTriangle';
      case 'unavailable':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  return (
    <div
      onClick={() => onClick(category)}
      className={`
        relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-border bg-card hover:border-primary/50'
        }
        ${className}
      `}
    >
      {/* Category Icon and Title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center
            ${isSelected 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            <Icon name={category?.icon} size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{category?.name}</h3>
            <p className="text-sm text-muted-foreground">{category?.description}</p>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-1">
          <Icon 
            name={getStatusIcon(category?.status)} 
            size={16} 
            className={getStatusColor(category?.status)}
          />
          <span className={`text-xs font-medium ${getStatusColor(category?.status)}`}>
            {category?.status === 'available' ? 'Available' : 
             category?.status === 'maintenance' ? 'Maintenance' : 'Unavailable'}
          </span>
        </div>
      </div>
      {/* Provider Count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Building2" size={14} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            {category?.providerCount} providers
          </span>
        </div>
        
        {/* Popular Badge */}
        {category?.isPopular && (
          <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
            Popular
          </span>
        )}
      </div>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BillCategoryCard;