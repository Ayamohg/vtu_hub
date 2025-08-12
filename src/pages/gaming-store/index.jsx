import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import TransactionStatusBar from '../../components/ui/TransactionStatusBar';

// Import components
import GameHeroCard from './components/GameHeroCard';
import CODPointsPackage from './components/CODPointsPackage';
import BattlePassCard from './components/BattlePassCard';
import GameSelector from './components/GameSelector';
import PurchaseModal from './components/PurchaseModal';
import RecentPurchases from './components/RecentPurchases';
import AccountStatus from './components/AccountStatus';

const GamingStore = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState({
    isVisible: false,
    status: 'processing',
    message: '',
    transactionId: ''
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data
  const featuredGames = [
    {
      id: 'cod-mw3',
      title: 'Call of Duty: Modern Warfare III',
      description: 'The latest installment in the legendary Call of Duty franchise',
      shortDescription: 'Latest COD with battle royale and multiplayer',
      heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      isPopular: true,
      isNew: false,
      isAvailable: true,
      currentOffer: 'Up to 20% bonus COD Points',
      playerCount: '2.5M'
    },
    {
      id: 'cod-warzone',
      title: 'Call of Duty: Warzone',
      description: 'Free-to-play battle royale experience',
      shortDescription: 'Free battle royale with cross-platform play',
      heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
      isPopular: true,
      isNew: false,
      isAvailable: true,
      currentOffer: 'Double XP Weekend',
      playerCount: '5.2M'
    },
    {
      id: 'cod-mobile',
      title: 'Call of Duty: Mobile',
      description: 'Console-quality gaming on your mobile device',
      shortDescription: 'Mobile COD with multiplayer and battle royale',
      heroImage: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=400&fit=crop',
      isPopular: false,
      isNew: true,
      isAvailable: true,
      currentOffer: 'New Season Available',
      playerCount: '1.8M'
    }
  ];

  const codPointsPackages = [
    {
      id: 'cod-500',
      points: 500,
      bonusPoints: 0,
      bonusPercentage: 0,
      price: 2500,
      originalPrice: null,
      isLimitedTime: false,
      features: ['Instant delivery', 'All platforms supported']
    },
    {
      id: 'cod-1200',
      points: 1200,
      bonusPoints: 200,
      bonusPercentage: 15,
      price: 5500,
      originalPrice: 6000,
      isLimitedTime: true,
      features: ['Instant delivery', 'Bonus points included', 'Best value']
    },
    {
      id: 'cod-2400',
      points: 2400,
      bonusPoints: 400,
      bonusPercentage: 20,
      price: 10500,
      originalPrice: 12000,
      isLimitedTime: false,
      features: ['Instant delivery', 'Maximum bonus', 'Premium support']
    },
    {
      id: 'cod-5000',
      points: 5000,
      bonusPoints: 1000,
      bonusPercentage: 25,
      price: 20000,
      originalPrice: 25000,
      isLimitedTime: true,
      features: ['Instant delivery', 'Exclusive rewards', 'VIP support', 'Season pass discount']
    }
  ];

  const battlePasses = [
    {
      id: 'mw3-s1',
      title: 'Season 1 Battle Pass',
      season: 'Season 1',
      description: 'Unlock exclusive weapons, operators, and cosmetic items in the latest season of Modern Warfare III.',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=200&fit=crop',
      price: 4500,
      originalPrice: 5000,
      isActive: true,
      timeRemaining: '45 days',
      featuredRewards: [
        { name: 'Operator Skin', icon: 'User' },
        { name: 'Weapon Blueprint', icon: 'Zap' },
        { name: 'Vehicle Skin', icon: 'Car' },
        { name: 'Calling Card', icon: 'Award' }
      ]
    },
    {
      id: 'warzone-s1',
      title: 'Warzone Season 1',
      season: 'Season 1',
      description: 'Battle royale exclusive content with unique rewards and progression system.',
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=200&fit=crop',
      price: 4500,
      originalPrice: null,
      isActive: true,
      timeRemaining: '38 days',
      featuredRewards: [
        { name: 'Parachute Skin', icon: 'Plane' },
        { name: 'Weapon Charm', icon: 'Star' },
        { name: 'Emote', icon: 'Smile' },
        { name: 'XP Token', icon: 'Zap' }
      ]
    }
  ];

  const userBattlePassProgress = {
    'mw3-s1': {
      currentTier: 25,
      maxTiers: 100,
      xpToNext: 1250
    }
  };

  const recentPurchases = [
    {
      id: 'tx_001',
      game: 'Call of Duty: Modern Warfare III',
      points: 1200,
      amount: 5500,
      status: 'delivered',
      date: '2025-01-08T14:30:00Z',
      deliveredAt: '2025-01-08T14:35:00Z',
      transactionId: 'COD123456789',
      platform: 'activision'
    },
    {
      id: 'tx_002',
      game: 'Call of Duty: Warzone',
      points: 500,
      amount: 2500,
      status: 'processing',
      date: '2025-01-09T09:15:00Z',
      transactionId: 'COD987654321',
      platform: 'battlenet'
    },
    {
      id: 'tx_003',
      game: 'Call of Duty: Mobile',
      points: 2400,
      amount: 10500,
      status: 'failed',
      date: '2025-01-07T16:45:00Z',
      transactionId: 'COD456789123',
      platform: 'activision',
      errorMessage: 'Payment method declined'
    }
  ];

  const linkedAccounts = [
    {
      id: 'acc_001',
      platform: 'activision',
      username: 'GamerNinja2024',
      isVerified: true,
      lastUsed: '2025-01-08T14:30:00Z'
    },
    {
      id: 'acc_002',
      platform: 'battlenet',
      username: 'ProGamer#1234',
      isVerified: true,
      lastUsed: '2025-01-06T10:20:00Z'
    },
    {
      id: 'acc_003',
      platform: 'steam',
      username: 'steamuser123',
      isVerified: false,
      lastUsed: null
    }
  ];

  // Set default selected game
  useEffect(() => {
    if (featuredGames?.length > 0 && !selectedGame) {
      setSelectedGame(featuredGames?.[0]);
    }
  }, [featuredGames, selectedGame]);

  const handlePurchasePackage = (pkg) => {
    setSelectedPackage(pkg);
    setShowPurchaseModal(true);
  };

  const handleConfirmPurchase = (purchaseData) => {
    const transactionId = `COD${Date.now()}`;
    
    setTransactionStatus({
      isVisible: true,
      status: 'processing',
      message: `Processing purchase of ${new Intl.NumberFormat('en-NG')?.format(purchaseData?.package?.points)} COD Points...`,
      transactionId
    });

    // Simulate transaction processing
    setTimeout(() => {
      setTransactionStatus(prev => ({
        ...prev,
        status: 'success',
        message: `Successfully purchased ${new Intl.NumberFormat('en-NG')?.format(purchaseData?.package?.points)} COD Points!`
      }));
    }, 3000);
  };

  const handlePurchaseBattlePass = (battlePass) => {
    console.log('Purchase battle pass:', battlePass);
    // Handle battle pass purchase
  };

  const handleViewBattlePassProgress = (battlePass) => {
    console.log('View progress:', battlePass);
    // Handle view progress
  };

  const handleLinkAccount = () => {
    console.log('Link gaming account');
    // Handle account linking
  };

  const handleManageAccount = (account, action) => {
    console.log('Manage account:', account, action);
    // Handle account management
  };

  const handleViewPurchaseDetails = (purchase) => {
    console.log('View purchase details:', purchase);
    // Handle view details
  };

  const handleGetSupport = (purchase) => {
    console.log('Get support for:', purchase);
    // Handle support request
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      {/* Transaction Status Bar */}
      <TransactionStatusBar
        isVisible={transactionStatus?.isVisible}
        status={transactionStatus?.status}
        message={transactionStatus?.message}
        transactionId={transactionStatus?.transactionId}
        onDismiss={() => setTransactionStatus(prev => ({ ...prev, isVisible: false }))}
      />
      {/* Main Content */}
      <div className="pt-16 pb-20 lg:pb-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:block border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <PrimaryNavigation />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground font-medium">Gaming</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Gamepad2" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gaming Store</h1>
                <p className="text-muted-foreground">Purchase COD Points, Battle Passes, and gaming content</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <GameSelector
                games={featuredGames}
                selectedGame={selectedGame}
                onGameChange={setSelectedGame}
              />
              <AccountStatus
                linkedAccounts={linkedAccounts}
                onLinkAccount={handleLinkAccount}
                onManageAccount={handleManageAccount}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Mobile Game Selector */}
              <div className="lg:hidden mb-6">
                <GameSelector
                  games={featuredGames}
                  selectedGame={selectedGame}
                  onGameChange={setSelectedGame}
                />
              </div>

              {/* Featured Games Hero Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">Featured Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {featuredGames?.slice(0, 2)?.map((game) => (
                    <GameHeroCard
                      key={game?.id}
                      game={game}
                      isActive={selectedGame?.id === game?.id}
                      onSelectGame={setSelectedGame}
                    />
                  ))}
                </div>
              </div>

              {/* COD Points Packages */}
              {selectedGame && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">COD Points Packages</h2>
                      <p className="text-sm text-muted-foreground">
                        Choose your package for {selectedGame?.title}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Zap" size={14} className="mr-1" />
                      <span>Instant delivery</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    {codPointsPackages?.map((pkg, index) => (
                      <CODPointsPackage
                        key={pkg?.id}
                        package={pkg}
                        isPopular={index === 1}
                        onPurchase={handlePurchasePackage}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Battle Passes */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Battle Passes</h2>
                    <p className="text-sm text-muted-foreground">
                      Unlock exclusive rewards and content
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {battlePasses?.map((battlePass) => (
                    <BattlePassCard
                      key={battlePass?.id}
                      battlePass={battlePass}
                      userProgress={userBattlePassProgress?.[battlePass?.id]}
                      onPurchase={handlePurchaseBattlePass}
                      onViewProgress={handleViewBattlePassProgress}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Purchases */}
              <div className="mb-8">
                <RecentPurchases
                  purchases={recentPurchases}
                  onViewDetails={handleViewPurchaseDetails}
                  onGetSupport={handleGetSupport}
                />
              </div>

              {/* Mobile Account Status */}
              <div className="lg:hidden">
                <AccountStatus
                  linkedAccounts={linkedAccounts}
                  onLinkAccount={handleLinkAccount}
                  onManageAccount={handleManageAccount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Purchase Modal */}
      <PurchaseModal
        isVisible={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        selectedPackage={selectedPackage}
        selectedGame={selectedGame}
        onConfirmPurchase={handleConfirmPurchase}
      />
      {/* Mobile Navigation */}
      <PrimaryNavigation />
    </div>
  );
};

export default GamingStore;