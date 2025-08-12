import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BattlePassCard = ({ 
  battlePass, 
  onPurchase = () => {},
  onViewProgress = () => {},
  userProgress = null 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(price);
  };

  const calculateProgress = () => {
    if (!userProgress) return 0;
    return Math.round((userProgress?.currentTier / userProgress?.maxTiers) * 100);
  };

  const isOwned = userProgress !== null;
  const progress = calculateProgress();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header Image */}
      <div className="relative h-32 lg:h-40">
        <Image
          src={battlePass?.image}
          alt={battlePass?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Season Badge */}
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          {battlePass?.season}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          {isOwned ? (
            <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
              Owned
            </div>
          ) : battlePass?.isActive ? (
            <div className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-medium">
              Active
            </div>
          ) : (
            <div className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
              Ended
            </div>
          )}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg">{battlePass?.title}</h3>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {battlePass?.description}
        </p>

        {/* Progress Section (if owned) */}
        {isOwned && userProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                Tier {userProgress?.currentTier}/{userProgress?.maxTiers}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>{progress}% Complete</span>
              <span>{userProgress?.xpToNext} XP to next tier</span>
            </div>
          </div>
        )}

        {/* Rewards Preview */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Featured Rewards</h4>
          <div className="flex items-center space-x-2">
            {battlePass?.featuredRewards?.slice(0, 4)?.map((reward, index) => (
              <div key={index} className="flex-1">
                <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={reward?.icon} size={16} color="var(--color-muted-foreground)" />
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{reward?.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Remaining */}
        {battlePass?.isActive && (
          <div className="flex items-center mb-4 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} className="mr-2" />
            <span>{battlePass?.timeRemaining} remaining</span>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            {!isOwned && (
              <div className="text-lg font-bold text-foreground">
                {formatPrice(battlePass?.price)}
              </div>
            )}
            {battlePass?.originalPrice && battlePass?.originalPrice > battlePass?.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(battlePass?.originalPrice)}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {isOwned ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProgress(battlePass)}
              >
                View Progress
              </Button>
            ) : battlePass?.isActive ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => onPurchase(battlePass)}
              >
                Purchase
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                disabled
              >
                Unavailable
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattlePassCard;