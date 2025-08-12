import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import TransactionStatusBar from '../../components/ui/TransactionStatusBar';
import PaymentMethodSelector from '../../components/ui/PaymentMethodSelector';
import NetworkProviderSelector from './components/NetworkProviderSelector';
import ServiceTabs from './components/ServiceTabs';
import PhoneNumberInput from './components/PhoneNumberInput';
import AirtimeSelector from './components/AirtimeSelector';
import DataBundleSelector from './components/DataBundleSelector';
import TransactionSummary from './components/TransactionSummary';
import SuccessModal from './components/SuccessModal';

const VTUServicesPage = () => {
  // State management
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('airtime');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [statusBarConfig, setStatusBarConfig] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data
  const recentRecipients = [
    { name: 'John Doe', phone: '0801 234 5678', provider: 'mtn' },
    { name: 'Jane Smith', phone: '0802 345 6789', provider: 'airtel' },
    { name: 'Mike Johnson', phone: '0803 456 7890', provider: 'glo' },
    { name: 'Sarah Wilson', phone: '0804 567 8901', provider: '9mobile' }
  ];

  const walletBalance = '₦25,450.00';

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedAmount(0);
    setCustomAmount('');
    setSelectedBundle(null);
  };

  // Handle recent recipient selection
  const handleRecipientSelect = (recipient) => {
    setPhoneNumber(recipient?.phone);
    // Auto-select provider if available
    const provider = getProviderById(recipient?.provider);
    if (provider) {
      setSelectedProvider(provider);
    }
  };

  const getProviderById = (id) => {
    const providers = [
      { id: 'mtn', name: 'MTN', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center' },
      { id: 'airtel', name: 'Airtel', logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-147413.jpeg?w=100&h=100&fit=crop&crop=center' },
      { id: 'glo', name: 'Glo', logo: 'https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=100&h=100&fit=crop&crop=center' },
      { id: '9mobile', name: '9mobile', logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center' }
    ];
    return providers?.find(p => p?.id === id);
  };

  // Handle purchase
  const handlePurchase = async () => {
    setIsProcessing(true);
    setShowStatusBar(true);
    setStatusBarConfig({
      status: 'processing',
      message: 'Processing your transaction...',
      progress: 0,
      transactionId: 'VTU' + Date.now()
    });

    // Simulate transaction processing
    const progressInterval = setInterval(() => {
      setStatusBarConfig(prev => ({
        ...prev,
        progress: Math.min(prev?.progress + 20, 90)
      }));
    }, 500);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      
      // Success
      const transaction = {
        transactionId: 'VTU' + Date.now(),
        provider: selectedProvider,
        phoneNumber,
        serviceType: activeTab,
        amount: activeTab === 'airtime' ? selectedAmount : selectedBundle?.price,
        bundle: selectedBundle,
        timestamp: new Date()
      };

      setTransactionData(transaction);
      setStatusBarConfig({
        status: 'success',
        message: 'Transaction completed successfully!',
        progress: 100,
        transactionId: transaction?.transactionId
      });

      setTimeout(() => {
        setShowStatusBar(false);
        setShowSuccess(true);
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      clearInterval(progressInterval);
      setStatusBarConfig({
        status: 'error',
        message: 'Transaction failed. Please try again.',
        transactionId: 'VTU' + Date.now()
      });
      setIsProcessing(false);
    }
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccess(false);
    // Reset form
    setSelectedProvider(null);
    setPhoneNumber('');
    setSelectedAmount(0);
    setCustomAmount('');
    setSelectedBundle(null);
    setActiveTab('airtime');
  };

  // Check if form is valid
  const isFormValid = () => {
    const hasProvider = selectedProvider !== null;
    const hasPhone = phoneNumber?.length > 0;
    const hasService = activeTab === 'airtime' ? selectedAmount > 0 : selectedBundle !== null;
    return hasProvider && hasPhone && hasService;
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
        isVisible={showStatusBar}
        status={statusBarConfig?.status}
        message={statusBarConfig?.message}
        progress={statusBarConfig?.progress}
        transactionId={statusBarConfig?.transactionId}
        onDismiss={() => setShowStatusBar(false)}
        onRetry={handlePurchase}
      />
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:block bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <PrimaryNavigation />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground font-medium">VTU Services</span>
          </nav>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Smartphone" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">VTU Services</h1>
              <p className="text-muted-foreground">Purchase airtime and data bundles instantly</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Desktop */}
            <div className="lg:col-span-4 space-y-6">
              {/* Network Provider Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <NetworkProviderSelector
                  selectedProvider={selectedProvider}
                  onProviderSelect={setSelectedProvider}
                />
              </div>

              {/* Recent Recipients - Desktop */}
              <div className="hidden lg:block bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Recipients</h3>
                <div className="space-y-3">
                  {recentRecipients?.slice(0, 4)?.map((recipient, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecipientSelect(recipient)}
                      className="flex items-center space-x-3 w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {recipient?.name?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{recipient?.name}</p>
                        <p className="text-sm text-muted-foreground">{recipient?.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Service Tabs */}
              <ServiceTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Phone Number Input */}
              <div className="bg-card border border-border rounded-lg p-6">
                <PhoneNumberInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  selectedProvider={selectedProvider}
                  recentRecipients={recentRecipients}
                  onRecipientSelect={handleRecipientSelect}
                />
              </div>

              {/* Service Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                {activeTab === 'airtime' ? (
                  <AirtimeSelector
                    selectedAmount={selectedAmount}
                    onAmountSelect={setSelectedAmount}
                    customAmount={customAmount}
                    onCustomAmountChange={setCustomAmount}
                  />
                ) : (
                  <DataBundleSelector
                    selectedBundle={selectedBundle}
                    onBundleSelect={setSelectedBundle}
                    selectedProvider={selectedProvider}
                  />
                )}
              </div>

              {/* Transaction Summary */}
              {isFormValid() && (
                <TransactionSummary
                  selectedProvider={selectedProvider}
                  phoneNumber={phoneNumber}
                  serviceType={activeTab}
                  selectedAmount={selectedAmount}
                  selectedBundle={selectedBundle}
                  onPurchase={handlePurchase}
                  isProcessing={isProcessing}
                  walletBalance={walletBalance}
                />
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
        onSelect={setSelectedPaymentMethod}
        selectedMethod={selectedPaymentMethod}
        walletBalance={walletBalance}
      />
      {/* Success Modal */}
      <SuccessModal
        isVisible={showSuccess}
        onClose={handleSuccessClose}
        transactionData={transactionData}
        onDownloadReceipt={() => {
          // Handle receipt download
          console.log('Downloading receipt...');
        }}
        onShareReceipt={() => {
          // Handle receipt sharing
          console.log('Sharing receipt...');
        }}
      />
    </div>
  );
};

export default VTUServicesPage;