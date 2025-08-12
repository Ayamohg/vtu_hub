import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import TransactionStatusBar from '../../components/ui/TransactionStatusBar';

// Import page components
import CardDisplay from './components/CardDisplay';
import AddCardForm from './components/AddCardForm';
import SecuritySettings from './components/SecuritySettings';
import RecentActivity from './components/RecentActivity';
import BankIntegration from './components/BankIntegration';

const PaymentCards = () => {
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [statusBarConfig, setStatusBarConfig] = useState({});
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Mock user data
  const user = {
    name: 'Adebayo Johnson',
    balance: '₦47,250.00'
  };

  // Mock cards data
  const [cards, setCards] = useState([
    {
      id: 'card_1',
      type: 'visa',
      last4: '4532',
      expiryMonth: '12',
      expiryYear: '25',
      holderName: 'ADEBAYO JOHNSON',
      bank: 'gtbank',
      nickname: 'Primary Card',
      isDefault: true,
      dailyLimit: 100000,
      threeDSecure: true,
      status: 'active'
    },
    {
      id: 'card_2',
      type: 'mastercard',
      last4: '8901',
      expiryMonth: '08',
      expiryYear: '26',
      holderName: 'ADEBAYO JOHNSON',
      bank: 'access',
      nickname: 'Business Card',
      isDefault: false,
      dailyLimit: 250000,
      threeDSecure: true,
      status: 'active'
    },
    {
      id: 'card_3',
      type: 'verve',
      last4: '2468',
      expiryMonth: '03',
      expiryYear: '27',
      holderName: 'ADEBAYO JOHNSON',
      bank: 'zenith',
      nickname: 'Savings Card',
      isDefault: false,
      dailyLimit: 50000,
      threeDSecure: false,
      status: 'active'
    }
  ]);

  const handleAddCard = async (cardData) => {
    setIsAddingCard(true);
    
    // Show processing status
    setStatusBarConfig({
      status: 'processing',
      message: 'Adding your card securely...',
      progress: 0,
      showProgress: true
    });
    setShowStatusBar(true);

    // Simulate card addition process
    setTimeout(() => {
      setStatusBarConfig(prev => ({ ...prev, progress: 30, message: 'Validating card details...' }));
    }, 500);

    setTimeout(() => {
      setStatusBarConfig(prev => ({ ...prev, progress: 60, message: 'Connecting to bank...' }));
    }, 1500);

    setTimeout(() => {
      setStatusBarConfig(prev => ({ ...prev, progress: 90, message: 'Finalizing setup...' }));
    }, 2500);

    setTimeout(() => {
      // Create new card
      const newCard = {
        id: `card_${Date.now()}`,
        type: cardData?.cardNumber?.startsWith('4') ? 'visa' : 
              cardData?.cardNumber?.startsWith('5') ? 'mastercard' : 'verve',
        last4: cardData?.cardNumber?.slice(-4),
        expiryMonth: cardData?.expiryMonth,
        expiryYear: cardData?.expiryYear,
        holderName: cardData?.holderName,
        bank: cardData?.bank,
        nickname: cardData?.nickname || 'New Card',
        isDefault: cards?.length === 0,
        dailyLimit: parseInt(cardData?.dailyLimit),
        threeDSecure: cardData?.enableThreeDSecure,
        status: 'active'
      };

      setCards(prev => [...prev, newCard]);
      setShowAddCardForm(false);
      setIsAddingCard(false);

      // Show success status
      setStatusBarConfig({
        status: 'success',
        message: `Card ending in ${newCard?.last4} added successfully!`,
        transactionId: `CARD-${newCard?.id?.toUpperCase()}`,
        showProgress: false
      });

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setShowStatusBar(false);
      }, 3000);
    }, 3000);
  };

  const handleSetDefault = (cardId) => {
    setCards(prev => prev?.map(card => ({
      ...card,
      isDefault: card?.id === cardId
    })));

    setStatusBarConfig({
      status: 'success',
      message: 'Default payment method updated successfully',
      showProgress: false
    });
    setShowStatusBar(true);

    setTimeout(() => {
      setShowStatusBar(false);
    }, 2000);
  };

  const handleEditCard = (cardId) => {
    // In real app, open edit modal
    console.log('Edit card:', cardId);
  };

  const handleRemoveCard = (cardId) => {
    // In real app, show confirmation dialog
    setCards(prev => prev?.filter(card => card?.id !== cardId));
    
    setStatusBarConfig({
      status: 'success',
      message: 'Card removed successfully',
      showProgress: false
    });
    setShowStatusBar(true);

    setTimeout(() => {
      setShowStatusBar(false);
    }, 2000);
  };

  const handleRetryStatus = () => {
    setShowStatusBar(false);
  };

  const handleDismissStatus = () => {
    setShowStatusBar(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        user={user}
        notifications={3}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      {/* Transaction Status Bar */}
      <TransactionStatusBar
        isVisible={showStatusBar}
        {...statusBarConfig}
        onRetry={handleRetryStatus}
        onDismiss={handleDismissStatus}
      />
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between py-6 border-b border-border">
            <PrimaryNavigation />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 py-4 text-sm">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            <span className="text-foreground font-medium">Payment Cards</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Payment Cards
              </h1>
              <p className="text-muted-foreground">
                Manage your linked payment methods and card security settings
              </p>
            </div>
            
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowAddCardForm(true)}
              iconName="Plus"
              iconPosition="left"
              className="lg:w-auto"
            >
              Add New Card
            </Button>
          </div>

          {/* Cards Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="CreditCard" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Total Cards</h3>
                  <p className="text-sm text-muted-foreground">Active payment methods</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{cards?.length}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">3D Secure</h3>
                  <p className="text-sm text-muted-foreground">Enhanced security</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {cards?.filter(card => card?.threeDSecure)?.length}
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:col-span-2 xl:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="var(--color-warning)" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Monthly Spend</h3>
                  <p className="text-sm text-muted-foreground">Current month</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">₦125,430</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Cards List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Cards Display */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Wallet" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Your Cards</h3>
                      <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cards?.map((card) => (
                    <CardDisplay
                      key={card?.id}
                      card={card}
                      isDefault={card?.isDefault}
                      onSetDefault={handleSetDefault}
                      onEdit={handleEditCard}
                      onRemove={handleRemoveCard}
                    />
                  ))}
                </div>

                {cards?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="CreditCard" size={64} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-foreground mb-2">No Cards Added</h4>
                    <p className="text-muted-foreground mb-6">
                      Add your first payment card to start making secure transactions
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setShowAddCardForm(true)}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Add Your First Card
                    </Button>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Right Column - Security & Integration */}
            <div className="lg:col-span-4 space-y-6">
              {/* Security Settings */}
              <SecuritySettings />

              {/* Bank Integration */}
              <BankIntegration />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <PrimaryNavigation />
      {/* Add Card Form Modal */}
      <AddCardForm
        isVisible={showAddCardForm}
        onClose={() => setShowAddCardForm(false)}
        onSubmit={handleAddCard}
        isLoading={isAddingCard}
      />
    </div>
  );
};

export default PaymentCards;