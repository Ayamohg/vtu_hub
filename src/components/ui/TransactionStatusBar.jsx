import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const TransactionStatusBar = ({
  isVisible = false,
  status = 'processing', // 'processing', 'success', 'error', 'pending'
  message = '',
  progress = 0,
  onRetry = () => {},
  onDismiss = () => {},
  transactionId = '',
  showProgress = true,
  autoHide = true,
  duration = 5000
}) => {
  React.useEffect(() => {
    if (autoHide && (status === 'success' || status === 'error') && isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [status, isVisible, autoHide, duration, onDismiss]);

  if (!isVisible) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: 'Loader2',
          iconClass: 'animate-spin',
          bgClass: 'bg-primary/10 border-primary/20',
          textClass: 'text-primary',
          iconColor: 'var(--color-primary)'
        };
      case 'success':
        return {
          icon: 'CheckCircle',
          iconClass: '',
          bgClass: 'bg-success/10 border-success/20',
          textClass: 'text-success',
          iconColor: 'var(--color-success)'
        };
      case 'error':
        return {
          icon: 'XCircle',
          iconClass: '',
          bgClass: 'bg-error/10 border-error/20',
          textClass: 'text-error',
          iconColor: 'var(--color-error)'
        };
      case 'pending':
        return {
          icon: 'Clock',
          iconClass: '',
          bgClass: 'bg-warning/10 border-warning/20',
          textClass: 'text-warning',
          iconColor: 'var(--color-warning)'
        };
      default:
        return {
          icon: 'Info',
          iconClass: '',
          bgClass: 'bg-muted border-border',
          textClass: 'text-muted-foreground',
          iconColor: 'currentColor'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`
      fixed top-16 left-0 right-0 z-[999] 
      ${config?.bgClass} 
      border-b backdrop-blur-sm
    `}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Status Icon */}
            <div className="flex-shrink-0">
              <Icon 
                name={config?.icon} 
                size={20} 
                color={config?.iconColor}
                className={config?.iconClass}
              />
            </div>

            {/* Message and Progress */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${config?.textClass} truncate`}>
                    {message || getDefaultMessage(status)}
                  </p>
                  {transactionId && (
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      ID: {transactionId}
                    </p>
                  )}
                </div>

                {/* Progress Bar */}
                {showProgress && status === 'processing' && (
                  <div className="ml-4 w-24 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-smooth"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            {status === 'error' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRetry}
                className="text-error hover:bg-error/10"
              >
                <Icon name="RotateCcw" size={16} className="mr-1" />
                Retry
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className={`${config?.textClass} hover:bg-current/10`}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Responsive Progress */}
        {showProgress && status === 'processing' && (
          <div className="mt-2 lg:hidden">
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-smooth"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getDefaultMessage = (status) => {
  switch (status) {
    case 'processing':
      return 'Processing your transaction...';
    case 'success':
      return 'Transaction completed successfully';
    case 'error':
      return 'Transaction failed. Please try again.';
    case 'pending':
      return 'Transaction is pending confirmation';
    default:
      return 'Transaction status update';
  }
};

export default TransactionStatusBar;