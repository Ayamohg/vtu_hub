import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentPurchases = ({ 
  purchases = [],
  onViewDetails = () => {},
  onGetSupport = () => {} 
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

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-NG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'delivered':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bg: 'bg-success/10',
          label: 'Delivered'
        };
      case 'processing':
        return {
          icon: 'Loader2',
          color: 'text-primary',
          bg: 'bg-primary/10',
          label: 'Processing',
          animate: 'animate-spin'
        };
      case 'failed':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bg: 'bg-error/10',
          label: 'Failed'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bg: 'bg-warning/10',
          label: 'Pending'
        };
      default:
        return {
          icon: 'Info',
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          label: 'Unknown'
        };
    }
  };

  if (purchases?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ShoppingBag" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No Recent Purchases</h3>
        <p className="text-sm text-muted-foreground">
          Your gaming purchases will appear here once you make your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Purchases</h3>
        <p className="text-sm text-muted-foreground">Track your gaming orders and delivery status</p>
      </div>
      <div className="divide-y divide-border">
        {purchases?.map((purchase) => {
          const statusConfig = getStatusConfig(purchase?.status);
          
          return (
            <div key={purchase?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  {/* Game Icon */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Gamepad2" size={20} color="var(--color-primary)" />
                  </div>

                  {/* Purchase Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{purchase?.game}</h4>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                        <Icon 
                          name={statusConfig?.icon} 
                          size={12} 
                          className={`mr-1 ${statusConfig?.animate || ''}`}
                        />
                        {statusConfig?.label}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatPoints(purchase?.points)} COD Points • {formatPrice(purchase?.amount)}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatDate(purchase?.date)}</span>
                      <span>ID: {purchase?.transactionId}</span>
                      {purchase?.platform && (
                        <span className="capitalize">{purchase?.platform}</span>
                      )}
                    </div>

                    {/* Delivery Info */}
                    {purchase?.status === 'delivered' && purchase?.deliveredAt && (
                      <div className="flex items-center mt-2 text-xs text-success">
                        <Icon name="Check" size={12} className="mr-1" />
                        <span>Delivered {formatDate(purchase?.deliveredAt)}</span>
                      </div>
                    )}

                    {/* Error Message */}
                    {purchase?.status === 'failed' && purchase?.errorMessage && (
                      <div className="flex items-center mt-2 text-xs text-error">
                        <Icon name="AlertCircle" size={12} className="mr-1" />
                        <span>{purchase?.errorMessage}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(purchase)}
                  >
                    Details
                  </Button>
                  
                  {(purchase?.status === 'failed' || purchase?.status === 'pending') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGetSupport(purchase)}
                    >
                      Support
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* View All Link */}
      {purchases?.length >= 3 && (
        <div className="p-4 border-t border-border text-center">
          <Button variant="ghost" size="sm">
            View All Purchases
            <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentPurchases;