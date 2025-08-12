import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = ({ 
  transactions = [],
  onViewAll = () => {},
  isLoading = false 
}) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'var(--color-success)' };
      case 'pending':
        return { icon: 'Clock', color: 'var(--color-warning)' };
      case 'failed':
        return { icon: 'XCircle', color: 'var(--color-error)' };
      default:
        return { icon: 'Clock', color: 'var(--color-muted-foreground)' };
    }
  };

  const getServiceIcon = (type) => {
    switch (type) {
      case 'airtime':
        return 'Smartphone';
      case 'data':
        return 'Wifi';
      case 'electricity':
        return 'Zap';
      case 'cable':
        return 'Tv';
      case 'gaming':
        return 'Gamepad2';
      default:
        return 'Receipt';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString('en-NG', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <div className="animate-pulse bg-muted rounded h-8 w-20"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)]?.map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="animate-pulse bg-muted rounded-full w-12 h-12"></div>
              <div className="flex-1 space-y-2">
                <div className="animate-pulse bg-muted rounded h-4 w-32"></div>
                <div className="animate-pulse bg-muted rounded h-3 w-24"></div>
              </div>
              <div className="animate-pulse bg-muted rounded h-4 w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      {transactions?.length === 0 ? (
        <div className="text-center py-8">
          <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Icon name="Receipt" size={24} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-muted-foreground">No transactions yet</p>
          <p className="text-sm text-muted-foreground mt-1">Your recent activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions?.map((transaction) => {
            const statusConfig = getStatusIcon(transaction?.status);
            return (
              <div key={transaction?.id} className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                <div className="relative">
                  <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center">
                    <Icon 
                      name={getServiceIcon(transaction?.type)} 
                      size={20} 
                      color="var(--color-muted-foreground)" 
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-card border-2 border-card rounded-full">
                    <Icon 
                      name={statusConfig?.icon} 
                      size={14} 
                      color={statusConfig?.color} 
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {transaction?.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">
                      {transaction?.recipient}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(transaction?.timestamp)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-mono font-semibold ${
                    transaction?.type === 'credit' ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction?.type === 'credit' ? '+' : '-'}{transaction?.amount}
                  </p>
                  <p className={`text-xs capitalize ${
                    transaction?.status === 'completed' ? 'text-success' :
                    transaction?.status === 'pending'? 'text-warning' : 'text-error'
                  }`}>
                    {transaction?.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;