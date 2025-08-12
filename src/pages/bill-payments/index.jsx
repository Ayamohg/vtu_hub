import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import TransactionStatusBar from '../../components/ui/TransactionStatusBar';
import PaymentMethodSelector from '../../components/ui/PaymentMethodSelector';
import BillCategoryCard from './components/BillCategoryCard';
import ProviderCard from './components/ProviderCard';
import BillPaymentForm from './components/BillPaymentForm';
import SavedBillersCard from './components/SavedBillersCard';
import RecentTransactionsCard from './components/RecentTransactionsCard';
import QuickPayModal from './components/QuickPayModal';

const BillPayments = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [showQuickPayModal, setShowQuickPayModal] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState({
    isVisible: false,
    status: 'processing',
    message: '',
    progress: 0
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for bill categories
  const billCategories = [
    {
      id: 'electricity',
      name: 'Electricity',
      description: 'Pay your electricity bills',
      icon: 'Zap',
      status: 'available',
      providerCount: 12,
      isPopular: true
    },
    {
      id: 'cable-tv',
      name: 'Cable TV',
      description: 'Renew your TV subscriptions',
      icon: 'Tv',
      status: 'available',
      providerCount: 8,
      isPopular: true
    },
    {
      id: 'internet',
      name: 'Internet',
      description: 'Pay for internet services',
      icon: 'Wifi',
      status: 'available',
      providerCount: 15,
      isPopular: false
    },
    {
      id: 'water',
      name: 'Water',
      description: 'Water utility payments',
      icon: 'Droplets',
      status: 'available',
      providerCount: 6,
      isPopular: false
    },
    {
      id: 'government',
      name: 'Government',
      description: 'Tax and government services',
      icon: 'Building2',
      status: 'maintenance',
      providerCount: 4,
      isPopular: false
    }
  ];

  // Mock data for providers based on category
  const getProvidersForCategory = (categoryId) => {
    const providers = {
      'electricity': [
        {
          id: 'ekedc',
          name: 'Eko Electricity Distribution Company',
          type: 'Electricity Distribution',
          logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '2-5 mins',
          features: ['Instant', 'Receipt']
        },
        {
          id: 'ikedc',
          name: 'Ikeja Electric',
          type: 'Electricity Distribution',
          logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '1-3 mins',
          features: ['Instant', 'Receipt', 'Auto-pay']
        },
        {
          id: 'phed',
          name: 'Port Harcourt Electricity Distribution',
          type: 'Electricity Distribution',
          logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '3-7 mins',
          features: ['Receipt']
        }
      ],
      'cable-tv': [
        {
          id: 'dstv',
          name: 'DStv',
          type: 'Satellite TV',
          logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '1-2 mins',
          features: ['Instant', 'Auto-renewal']
        },
        {
          id: 'gotv',
          name: 'GOtv',
          type: 'Digital TV',
          logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '1-2 mins',
          features: ['Instant', 'Receipt']
        },
        {
          id: 'startimes',
          name: 'StarTimes',
          type: 'Digital TV',
          logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '2-5 mins',
          features: ['Receipt']
        }
      ],
      'internet': [
        {
          id: 'mtn-fiber',
          name: 'MTN Fiber',
          type: 'Internet Service',
          logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '1-3 mins',
          features: ['Instant', 'Receipt']
        },
        {
          id: 'airtel-fiber',
          name: 'Airtel Fiber',
          type: 'Internet Service',
          logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '2-5 mins',
          features: ['Receipt']
        }
      ],
      'water': [
        {
          id: 'lagos-water',
          name: 'Lagos Water Corporation',
          type: 'Water Utility',
          logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop',
          isAvailable: true,
          processingTime: '5-10 mins',
          features: ['Receipt']
        }
      ]
    };
    return providers?.[categoryId] || [];
  };

  // Mock saved billers
  const savedBillers = [
    {
      id: 'biller_1',
      nickname: 'Home Electricity',
      providerName: 'Eko Electricity Distribution Company',
      providerLogo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      customerNumber: '1234567890',
      category: 'electricity',
      lastPayment: '2025-01-05',
      isDefault: true
    },
    {
      id: 'biller_2',
      nickname: 'DStv Subscription',
      providerName: 'DStv',
      providerLogo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&h=100&fit=crop',
      customerNumber: '7012345678',
      category: 'cable-tv',
      lastPayment: '2025-01-03',
      isDefault: false
    },
    {
      id: 'biller_3',
      nickname: 'Office Internet',
      providerName: 'MTN Fiber',
      providerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
      customerNumber: '9876543210',
      category: 'internet',
      lastPayment: '2024-12-28',
      isDefault: false
    }
  ];

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 'txn_1',
      providerName: 'Eko Electricity Distribution Company',
      providerLogo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      category: 'Electricity',
      customerNumber: '1234567890',
      amount: 5000,
      status: 'completed',
      date: '2025-01-08',
      time: '14:30',
      reference: 'TXN123456789'
    },
    {
      id: 'txn_2',
      providerName: 'DStv',
      providerLogo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=100&h=100&fit=crop',
      category: 'Cable TV',
      customerNumber: '7012345678',
      amount: 4200,
      status: 'pending',
      date: '2025-01-08',
      time: '12:15',
      reference: 'TXN123456788'
    },
    {
      id: 'txn_3',
      providerName: 'MTN Fiber',
      providerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
      category: 'Internet',
      customerNumber: '9876543210',
      amount: 8500,
      status: 'failed',
      date: '2025-01-07',
      time: '16:45',
      reference: 'TXN123456787'
    }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProvider(null);
    setShowPaymentForm(false);
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setShowPaymentForm(true);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedProvider(null);
    setShowPaymentForm(false);
  };

  const handleBackToProviders = () => {
    setShowPaymentForm(false);
    setSelectedProvider(null);
  };

  const handleFormSubmit = (formData) => {
    setShowPaymentSelector(true);
  };

  const handlePaymentMethodSelect = (paymentMethod) => {
    setShowPaymentSelector(false);
    setIsProcessing(true);
    
    // Show transaction status
    setTransactionStatus({
      isVisible: true,
      status: 'processing',
      message: `Processing ${selectedCategory?.name} payment...`,
      progress: 0
    });

    // Simulate payment processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setTransactionStatus(prev => ({
        ...prev,
        progress
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setTransactionStatus({
            isVisible: true,
            status: 'success',
            message: 'Payment completed successfully!',
            progress: 100
          });
          setIsProcessing(false);
          
          // Reset form after success
          setTimeout(() => {
            setShowPaymentForm(false);
            setSelectedProvider(null);
            setSelectedCategory(null);
          }, 2000);
        }, 500);
      }
    }, 800);
  };

  const handleQuickPay = (biller) => {
    setSelectedBiller(biller);
    setShowQuickPayModal(true);
  };

  const handleQuickPaySubmit = (paymentData) => {
    setShowQuickPayModal(false);
    setIsProcessing(true);
    
    setTransactionStatus({
      isVisible: true,
      status: 'processing',
      message: `Processing quick payment to ${paymentData?.providerName}...`,
      progress: 0
    });

    // Simulate quick payment processing
    setTimeout(() => {
      setTransactionStatus({
        isVisible: true,
        status: 'success',
        message: 'Quick payment completed successfully!',
        progress: 100
      });
      setIsProcessing(false);
    }, 3000);
  };

  const handleRetryTransaction = (transaction) => {
    setTransactionStatus({
      isVisible: true,
      status: 'processing',
      message: `Retrying payment to ${transaction?.providerName}...`,
      progress: 0
    });

    setTimeout(() => {
      setTransactionStatus({
        isVisible: true,
        status: 'success',
        message: 'Payment retry successful!',
        progress: 100
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* Transaction Status Bar */}
      <TransactionStatusBar
        isVisible={transactionStatus?.isVisible}
        status={transactionStatus?.status}
        message={transactionStatus?.message}
        progress={transactionStatus?.progress}
        onDismiss={() => setTransactionStatus(prev => ({ ...prev, isVisible: false }))}
        onRetry={() => {}}
        showProgress={transactionStatus?.status === 'processing'}
      />
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:block bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <PrimaryNavigation />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Bill Payments</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Bill Payments
            </h1>
            <p className="text-muted-foreground">
              Pay your utility bills quickly and securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Categories (Desktop) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h2 className="font-semibold text-foreground mb-4">Categories</h2>
                  <div className="space-y-2">
                    {billCategories?.map((category) => (
                      <button
                        key={category?.id}
                        onClick={() => handleCategorySelect(category)}
                        className={`
                          w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200
                          ${selectedCategory?.id === category?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground'
                          }
                        `}
                      >
                        <Icon name={category?.icon} size={20} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{category?.name}</p>
                          <p className={`text-xs truncate ${
                            selectedCategory?.id === category?.id
                              ? 'text-primary-foreground/80'
                              : 'text-muted-foreground'
                          }`}>
                            {category?.providerCount} providers
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saved Billers */}
                <SavedBillersCard
                  savedBillers={savedBillers}
                  onQuickPay={handleQuickPay}
                  onManage={() => {}}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {!selectedCategory ? (
                /* Category Selection - Mobile */
                (<div className="lg:hidden">
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {billCategories?.map((category) => (
                      <BillCategoryCard
                        key={category?.id}
                        category={category}
                        onClick={handleCategorySelect}
                      />
                    ))}
                  </div>
                  {/* Mobile Saved Billers */}
                  <SavedBillersCard
                    savedBillers={savedBillers}
                    onQuickPay={handleQuickPay}
                    onManage={() => {}}
                    className="mb-6"
                  />
                  {/* Recent Transactions */}
                  <RecentTransactionsCard
                    transactions={recentTransactions}
                    onViewAll={() => {}}
                    onRetry={handleRetryTransaction}
                  />
                </div>)
              ) : !showPaymentForm ? (
                /* Provider Selection */
                (<div>
                  {/* Back Button and Category Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToCategories}
                      className="lg:hidden"
                    >
                      <Icon name="ArrowLeft" size={20} />
                    </Button>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">
                        {selectedCategory?.name} Providers
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Choose your service provider
                      </p>
                    </div>
                  </div>
                  {/* Providers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getProvidersForCategory(selectedCategory?.id)?.map((provider) => (
                      <ProviderCard
                        key={provider?.id}
                        provider={provider}
                        isSelected={selectedProvider?.id === provider?.id}
                        onClick={handleProviderSelect}
                      />
                    ))}
                  </div>
                </div>)
              ) : (
                /* Payment Form */
                (<BillPaymentForm
                  provider={selectedProvider}
                  category={selectedCategory}
                  onSubmit={handleFormSubmit}
                  onBack={handleBackToProviders}
                  isLoading={isProcessing}
                />)
              )}

              {/* Desktop Recent Transactions */}
              {!selectedCategory && (
                <div className="hidden lg:block mt-8">
                  <RecentTransactionsCard
                    transactions={recentTransactions}
                    onViewAll={() => {}}
                    onRetry={handleRetryTransaction}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <PrimaryNavigation />
      {/* Payment Method Selector */}
      <PaymentMethodSelector
        isVisible={showPaymentSelector}
        onClose={() => setShowPaymentSelector(false)}
        onSelect={handlePaymentMethodSelect}
      />
      {/* Quick Pay Modal */}
      <QuickPayModal
        isVisible={showQuickPayModal}
        biller={selectedBiller}
        onClose={() => setShowQuickPayModal(false)}
        onPay={handleQuickPaySubmit}
        isLoading={isProcessing}
      />
    </div>
  );
};

export default BillPayments;