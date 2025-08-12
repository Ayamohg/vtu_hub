import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import TransactionStatusBar from '../../components/ui/TransactionStatusBar';
import AccountBalanceCard from './components/AccountBalanceCard';
import ServiceTile from './components/ServiceTile';
import RecentTransactions from './components/RecentTransactions';
import QuickActions from './components/QuickActions';
import PromotionalBanner from './components/PromotionalBanner';
import AccountInsights from './components/AccountInsights';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [statusBarConfig, setStatusBarConfig] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Mock user data
  const userData = {
    name: "Adebayo Johnson",
    balance: "₦25,450.00",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  // Mock recent transactions
  const recentTransactions = [
    {
      id: "txn_001",
      type: "airtime",
      description: "MTN Airtime Purchase",
      recipient: "08012345678",
      amount: "₦1,000.00",
      status: "completed",
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: "txn_002",
      type: "electricity",
      description: "EKEDC Bill Payment",
      recipient: "Meter: 12345678901",
      amount: "₦5,500.00",
      status: "completed",
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: "txn_003",
      type: "data",
      description: "Airtel Data Bundle",
      recipient: "08098765432",
      amount: "₦2,000.00",
      status: "pending",
      timestamp: new Date(Date.now() - 10800000) // 3 hours ago
    },
    {
      id: "txn_004",
      type: "gaming",
      description: "COD Points Purchase",
      recipient: "Gaming Account",
      amount: "₦3,200.00",
      status: "completed",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: "txn_005",
      type: "cable",
      description: "DSTV Subscription",
      recipient: "Smart Card: 1234567890",
      amount: "₦8,900.00",
      status: "failed",
      timestamp: new Date(Date.now() - 172800000) // 2 days ago
    }
  ];

  // Mock favorites
  const favorites = [
    {
      id: "fav_001",
      name: "MTN Airtime",
      icon: "Smartphone",
      action: () => navigate('/vtu-services')
    },
    {
      id: "fav_002",
      name: "EKEDC Bills",
      icon: "Zap",
      action: () => navigate('/bill-payments')
    },
    {
      id: "fav_003",
      name: "Data Bundles",
      icon: "Wifi",
      action: () => navigate('/vtu-services')
    },
    {
      id: "fav_004",
      name: "Gaming",
      icon: "Gamepad2",
      action: () => navigate('/gaming-store')
    }
  ];

  // Mock scheduled payments
  const scheduledPayments = [
    {
      id: "sch_001",
      description: "EKEDC Monthly Bill",
      amount: "₦5,500.00",
      nextDate: "Jan 15, 2025"
    },
    {
      id: "sch_002",
      description: "DSTV Subscription",
      amount: "₦8,900.00",
      nextDate: "Jan 20, 2025"
    }
  ];

  // Mock promotions
  const promotions = [
    {
      id: "promo_001",
      title: "New Year Bonus!",
      description: "Get 20% extra value on all airtime purchases above ₦2,000",
      discount: "20%",
      validUntil: "Jan 31, 2025",
      icon: "Gift",
      badge: "Limited Time",
      ctaText: "Get Bonus"
    },
    {
      id: "promo_002",
      title: "Gaming Special",
      description: "Buy COD Points and get exclusive battle pass rewards",
      discount: "15%",
      validUntil: "Feb 14, 2025",
      icon: "Gamepad2",
      badge: "Gaming Offer",
      ctaText: "Play Now"
    }
  ];

  // Service tiles configuration
  const serviceTiles = [
    {
      title: "VTU Services",
      description: "Buy airtime and data bundles for all networks",
      icon: "Smartphone",
      route: "/vtu-services",
      recentUsage: "Last used 30 min ago",
      isPopular: true,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Bill Payments",
      description: "Pay electricity, water, cable TV and internet bills",
      icon: "Receipt",
      route: "/bill-payments",
      recentUsage: "Last used 2 hours ago",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Gaming Store",
      description: "Purchase gaming items, COD points and battle passes",
      icon: "Gamepad2",
      route: "/gaming-store",
      recentUsage: "Last used yesterday",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Payment Cards",
      description: "Manage your payment methods and card settings",
      icon: "CreditCard",
      route: "/payment-cards",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  // Account insights
  const accountInsights = {
    monthlySpending: "₦18,750.00",
    topCategory: "Bill Payments",
    savingsThisMonth: "₦3,200.00",
    transactionCount: 28
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddMoney = () => {
    setStatusBarConfig({
      status: 'processing',
      message: 'Processing payment...',
      progress: 0,
      transactionId: 'TXN' + Date.now()
    });
    setShowStatusBar(true);

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 20;
      setStatusBarConfig(prev => ({ ...prev, progress }));
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setStatusBarConfig(prev => ({
            ...prev,
            status: 'success',
            message: 'Money added successfully!'
          }));
        }, 500);
      }
    }, 300);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handlePromotionClick = (promotion) => {
    console.log('Promotion clicked:', promotion);
    // Navigate to relevant service or show promotion details
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader
        user={userData}
        notifications={3}
        onNotificationClick={() => console.log('Notifications clicked')}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <PrimaryNavigation />
      <TransactionStatusBar
        isVisible={showStatusBar}
        {...statusBarConfig}
        onDismiss={() => setShowStatusBar(false)}
        onRetry={() => console.log('Retry transaction')}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Pull to refresh indicator */}
          {refreshing && (
            <div className="flex items-center justify-center py-4">
              <Icon name="RefreshCw" size={20} className="animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Refreshing...</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Account Balance */}
              <AccountBalanceCard
                balance={userData?.balance}
                onAddMoney={handleAddMoney}
                onViewHistory={() => navigate('/transactions')}
                isLoading={isLoading}
              />

              {/* Promotional Banner */}
              <PromotionalBanner
                promotions={promotions}
                onPromotionClick={handlePromotionClick}
              />

              {/* Service Tiles */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serviceTiles?.map((service, index) => (
                    <ServiceTile
                      key={index}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      route={service.route}
                      recentUsage={service.recentUsage}
                      isPopular={service.isPopular}
                      gradient={service.gradient}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions
                favorites={favorites}
                scheduledPayments={scheduledPayments}
                onManageFavorites={() => console.log('Manage favorites')}
                onManageScheduled={() => console.log('Manage scheduled')}
              />

              {/* Mobile Recent Transactions */}
              <div className="lg:hidden">
                <RecentTransactions
                  transactions={recentTransactions}
                  onViewAll={() => navigate('/transactions')}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <RecentTransactions
                transactions={recentTransactions}
                onViewAll={() => navigate('/transactions')}
                isLoading={isLoading}
              />
              
              <AccountInsights
                insights={accountInsights}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;