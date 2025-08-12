import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const GameSelector = ({ 
  games = [], 
  selectedGame = null, 
  onGameChange = () => {},
  className = '' 
}) => {
  const gameOptions = games?.map(game => ({
    value: game?.id,
    label: game?.title,
    description: game?.shortDescription,
    disabled: !game?.isAvailable
  }));

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Gamepad2" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Select Game</h3>
          <p className="text-sm text-muted-foreground">Choose your gaming platform</p>
        </div>
      </div>
      <Select
        options={gameOptions}
        value={selectedGame?.id || ''}
        onChange={(value) => {
          const game = games?.find(g => g?.id === value);
          onGameChange(game);
        }}
        placeholder="Choose a game..."
        searchable
        className="w-full"
      />
      {/* Selected Game Info */}
      {selectedGame && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground">{selectedGame?.title}</h4>
              <p className="text-sm text-muted-foreground">{selectedGame?.description}</p>
              {selectedGame?.playerCount && (
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Icon name="Users" size={12} className="mr-1" />
                  <span>{selectedGame?.playerCount} active players</span>
                </div>
              )}
            </div>
            {selectedGame?.isPopular && (
              <div className="bg-warning/10 text-warning px-2 py-1 rounded text-xs font-medium">
                Popular
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSelector;