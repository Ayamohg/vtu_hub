import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ className = '' }) => {
  const [selectedCard, setSelectedCard] = useState('all');
  const [timeFilter, setTimeFilter] = useState('7days');

  const recentTransactions = [
    {
      id: 'txn_001',
      cardId: 'card_1',
      cardLast4: '4532',
      type: 'purchase',
      merchant: 'MTN Nigeria',
      category: 'Airtime',
      amount: 5000,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      location: 'Lagos, Nigeria',
      reference: 'MTN-REF-001'
    },
    {
      id: 'txn_002',
      cardId: 'card_2',
      cardLast4: '8901',
      type: 'purchase',
      merchant: 'EKEDC',
      category: 'Electricity',
      amount: 15000,
      status: 'completed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      location: 'Lagos, Nigeria',
      reference: 'EKEDC-REF-002'
    },
    {
      id: 'txn_003',
      cardId: 'card_1',
      cardLast4: '4532',
      type: 'purchase',
      merchant: 'Call of Duty Store',
      category: 'Gaming',
      amount: 12500,
      status: 'pending',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      location: 'Online',
      reference: 'COD-REF-003'
    },
    {
      id: 'txn_004',
      cardId: 'card_2',
      cardLast4: '8901',
      type: 'refund',
      merchant: 'Airtel Nigeria',
      category: 'Data',
      amount: 3000,
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      location: 'Lagos, Nigeria',
      reference: 'AIRTEL-REF-004'
    },
    {
      id: 'txn_005',
      cardId: 'card_1',
      cardLast4: '4532',
      type: 'purchase',
      merchant: 'DSTV',
      category: 'Cable TV',
      amount: 8500,
      status: 'failed',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      location: 'Lagos, Nigeria',
      reference: 'DSTV-REF-005'
    }
  ];

  const getTransactionIcon = (type, category) => {
    if (type === 'refund') return 'RotateCcw';
    
    switch (category?.toLowerCase()) {
      case 'airtime':
        return 'Phone';
      case 'data':
        return 'Wifi';
      case 'electricity':
        return 'Zap';
      case 'cable tv':
        return 'Tv';
      case 'gaming':
        return 'Gamepad2';
      default:
        return 'CreditCard';
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

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10';
      case 'pending':
        return 'bg-warning/10';
      case 'failed':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const filteredTransactions = recentTransactions?.filter(transaction => {
    if (selectedCard !== 'all' && transaction?.cardId !== selectedCard) {
      return false;
    }
    
    const now = new Date();
    const transactionDate = transaction?.timestamp;
    const daysDiff = (now - transactionDate) / (1000 * 60 * 60 * 24);
    
    switch (timeFilter) {
      case '24hours':
        return daysDiff <= 1;
      case '7days':
        return daysDiff <= 7;
      case '30days':
        return daysDiff <= 30;
      default:
        return true;
    }
  });

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Latest card transactions</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Card:</span>
          <select
            value={selectedCard}
            onChange={(e) => setSelectedCard(e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Cards</option>
            <option value="card_1">•••• 4532</option>
            <option value="card_2">•••• 8901</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Period:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e?.target?.value)}
            className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>
      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions?.length > 0 ? (
          filteredTransactions?.map((transaction) => (
            <div
              key={transaction?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                {/* Transaction Icon */}
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getTransactionIcon(transaction?.type, transaction?.category)} 
                    size={20} 
                    color="var(--color-muted-foreground)" 
                  />
                </div>
                
                {/* Transaction Details */}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{transaction?.merchant}</h4>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      •••• {transaction?.cardLast4}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-muted-foreground">{transaction?.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{transaction?.location}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{formatTimeAgo(transaction?.timestamp)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    Ref: {transaction?.reference}
                  </p>
                </div>
              </div>
              
              {/* Amount and Status */}
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <p className={`font-mono font-semibold ${
                    transaction?.type === 'refund' ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction?.type === 'refund' ? '+' : '-'}₦{transaction?.amount?.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-end mt-1">
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-medium capitalize
                    ${getStatusBg(transaction?.status)} ${getStatusColor(transaction?.status)}
                  `}>
                    {transaction?.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="CreditCard" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">No transactions found</h4>
            <p className="text-sm text-muted-foreground">
              No transactions match your current filters. Try adjusting the time period or card selection.
            </p>
          </div>
        )}
      </div>
      {/* View All Link */}
      {filteredTransactions?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
          >
            View All Transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;