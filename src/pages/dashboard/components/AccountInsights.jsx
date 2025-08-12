import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountInsights = ({ 
  insights = {},
  isLoading = false 
}) => {
  const defaultInsights = {
    monthlySpending: "₦12,450.00",
    topCategory: "Airtime",
    savingsThisMonth: "₦2,100.00",
    transactionCount: 24,
    ...insights
  };

  const insightItems = [
    {
      label: "Monthly Spending",
      value: defaultInsights?.monthlySpending,
      icon: "TrendingUp",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      label: "Top Category",
      value: defaultInsights?.topCategory,
      icon: "Target",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      label: "Savings",
      value: defaultInsights?.savingsThisMonth,
      icon: "PiggyBank",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      label: "Transactions",
      value: defaultInsights?.transactionCount?.toString(),
      icon: "Activity",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="bg-muted rounded h-6 w-32 mb-6"></div>
          <div className="space-y-4">
            {[...Array(4)]?.map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="bg-muted rounded-full w-12 h-12"></div>
                <div className="flex-1 space-y-2">
                  <div className="bg-muted rounded h-4 w-24"></div>
                  <div className="bg-muted rounded h-3 w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Account Insights</h3>
      <div className="space-y-4">
        {insightItems?.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 hover:bg-muted/30 rounded-lg transition-colors">
            <div className={`${item?.bgColor} rounded-full p-3`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{item?.label}</p>
              <p className="font-semibold text-foreground">{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">This month vs last month</span>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={14} />
            <span className="font-medium">+12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInsights;