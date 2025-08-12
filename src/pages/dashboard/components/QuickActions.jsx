import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ 
  favorites = [],
  scheduledPayments = [],
  onManageFavorites = () => {},
  onManageScheduled = () => {}
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Favorites */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Access</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onManageFavorites}
            iconName="Settings"
            iconSize={16}
          >
            Manage
          </Button>
        </div>

        {favorites?.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon name="Star" size={20} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm text-muted-foreground">No favorites yet</p>
            <p className="text-xs text-muted-foreground mt-1">Add frequently used services</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {favorites?.slice(0, 4)?.map((favorite) => (
              <button
                key={favorite?.id}
                onClick={favorite?.action}
                className="flex flex-col items-center p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
              >
                <div className="bg-primary/10 rounded-full p-2 mb-2 group-hover:bg-primary/20 transition-colors">
                  <Icon name={favorite?.icon} size={18} color="var(--color-primary)" />
                </div>
                <span className="text-xs font-medium text-foreground text-center leading-tight">
                  {favorite?.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Scheduled Payments */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Scheduled</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onManageScheduled}
            iconName="Calendar"
            iconSize={16}
          >
            View All
          </Button>
        </div>

        {scheduledPayments?.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-muted rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Icon name="Calendar" size={20} color="var(--color-muted-foreground)" />
            </div>
            <p className="text-sm text-muted-foreground">No scheduled payments</p>
            <p className="text-xs text-muted-foreground mt-1">Set up recurring transactions</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduledPayments?.slice(0, 2)?.map((payment) => (
              <div key={payment?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="bg-warning/10 rounded-full p-2">
                  <Icon name="Clock" size={16} color="var(--color-warning)" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {payment?.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Next: {payment?.nextDate}
                  </p>
                </div>
                <span className="text-sm font-mono font-medium text-foreground">
                  {payment?.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActions;