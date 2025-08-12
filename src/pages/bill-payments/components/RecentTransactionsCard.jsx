import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentTransactionsCard = ({ 
  transactions = [],
  onViewAll = () => {},
  onRetry = () => {},
  className = '' 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  if (transactions?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Receipt" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="font-medium text-foreground mb-2">No Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">
          Your bill payment history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Receipt" size={20} color="var(--color-primary)" />
          <h3 className="font-medium text-foreground">Recent Transactions</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          View All
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Button>
      </div>
      {/* Transactions List */}
      <div className="divide-y divide-border">
        {transactions?.slice(0, 5)?.map((transaction) => (
          <div key={transaction?.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Provider Logo */}
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                  <Image 
                    src={transaction?.providerLogo} 
                    alt={`${transaction?.providerName} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Transaction Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground truncate">
                      {transaction?.providerName}
                    </h4>
                    <Icon 
                      name={getStatusIcon(transaction?.status)} 
                      size={14} 
                      className={getStatusColor(transaction?.status)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {transaction?.category} • {transaction?.customerNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction?.date} • {transaction?.time}
                  </p>
                </div>
              </div>

              {/* Amount and Actions */}
              <div className="text-right flex-shrink-0 ml-3">
                <p className="font-mono font-semibold text-foreground">
                  ₦{transaction?.amount?.toLocaleString()}
                </p>
                <p className={`text-xs font-medium capitalize ${getStatusColor(transaction?.status)}`}>
                  {transaction?.status}
                </p>
                
                {/* Retry Button for Failed Transactions */}
                {transaction?.status === 'failed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRetry(transaction)}
                    className="mt-1 text-xs h-6 px-2"
                  >
                    <Icon name="RotateCcw" size={12} className="mr-1" />
                    Retry
                  </Button>
                )}
              </div>
            </div>

            {/* Transaction Reference */}
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground font-mono">
                Ref: {transaction?.reference}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* View All Footer */}
      {transactions?.length > 5 && (
        <div className="p-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onViewAll} className="w-full">
            View All {transactions?.length} Transactions
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactionsCard;