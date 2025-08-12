import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountBalanceCard = ({ 
  balance = "₦25,450.00",
  onAddMoney = () => {},
  onViewHistory = () => {},
  isLoading = false 
}) => {
  const [animatedBalance, setAnimatedBalance] = useState(balance);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (balance !== animatedBalance) {
      setIsAnimating(true);
      setTimeout(() => {
        setAnimatedBalance(balance);
        setIsAnimating(false);
      }, 300);
    }
  }, [balance, animatedBalance]);

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-primary-foreground/80 text-sm font-medium">Account Balance</p>
          <div className={`transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold font-mono tracking-tight">
              {isLoading ? (
                <div className="animate-pulse bg-primary-foreground/20 rounded h-10 w-48"></div>
              ) : (
                animatedBalance
              )}
            </h2>
          </div>
        </div>
        <div className="bg-primary-foreground/10 rounded-full p-3">
          <Icon name="Wallet" size={32} color="currentColor" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          onClick={onAddMoney}
          className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          iconName="Plus"
          iconPosition="left"
          iconSize={18}
        >
          Add Money
        </Button>
        <Button
          variant="ghost"
          onClick={onViewHistory}
          className="flex-1 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
          iconName="History"
          iconPosition="left"
          iconSize={18}
        >
          History
        </Button>
      </div>
    </div>
  );
};

export default AccountBalanceCard;