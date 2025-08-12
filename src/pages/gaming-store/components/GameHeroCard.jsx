import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GameHeroCard = ({ 
  game, 
  onSelectGame = () => {},
  isActive = false 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300
        ${isActive 
          ? 'ring-2 ring-primary shadow-lg' 
          : 'hover:shadow-md hover:scale-[1.02]'
        }
      `}
      onClick={() => onSelectGame(game)}
    >
      {/* Background Image */}
      <div className="relative h-48 lg:h-64">
        <Image
          src={game?.heroImage}
          alt={game?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Popularity Badge */}
        {game?.isPopular && (
          <div className="absolute top-4 right-4 bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-medium">
            <Icon name="TrendingUp" size={12} className="inline mr-1" />
            Popular
          </div>
        )}

        {/* New Badge */}
        {game?.isNew && (
          <div className="absolute top-4 left-4 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
      </div>
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{game?.title}</h3>
            <p className="text-sm opacity-90 mt-1">{game?.description}</p>
            
            {/* Current Offers */}
            {game?.currentOffer && (
              <div className="flex items-center mt-2 text-warning">
                <Icon name="Zap" size={14} className="mr-1" />
                <span className="text-xs font-medium">{game?.currentOffer}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            variant={isActive ? "default" : "outline"}
            size="sm"
            className={`ml-4 ${!isActive ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' : ''}`}
          >
            {isActive ? 'Selected' : 'Select'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameHeroCard;