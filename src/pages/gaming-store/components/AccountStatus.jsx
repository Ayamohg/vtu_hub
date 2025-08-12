import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountStatus = ({ 
  linkedAccounts = [],
  onLinkAccount = () => {},
  onManageAccount = () => {} 
}) => {
  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'activision':
        return 'Shield';
      case 'battlenet':
        return 'Zap';
      case 'steam':
        return 'Monitor';
      case 'xbox':
        return 'Gamepad';
      case 'playstation':
        return 'Gamepad2';
      default:
        return 'User';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'activision':
        return 'text-orange-600';
      case 'battlenet':
        return 'text-blue-600';
      case 'steam':
        return 'text-gray-600';
      case 'xbox':
        return 'text-green-600';
      case 'playstation':
        return 'text-blue-800';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Gaming Accounts</h3>
            <p className="text-sm text-muted-foreground">Manage your linked gaming platforms</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLinkAccount}
            iconName="Plus"
            iconPosition="left"
          >
            Link Account
          </Button>
        </div>
      </div>
      <div className="p-4">
        {linkedAccounts?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Gamepad2" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="font-medium text-foreground mb-2">No Linked Accounts</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Link your gaming accounts for faster purchases and automatic delivery.
            </p>
            <Button
              variant="default"
              onClick={onLinkAccount}
              iconName="Plus"
              iconPosition="left"
            >
              Link Your First Account
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {linkedAccounts?.map((account) => (
              <div
                key={account?.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon 
                      name={getPlatformIcon(account?.platform)} 
                      size={20} 
                      className={getPlatformColor(account?.platform)}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground capitalize">
                        {account?.platform}
                      </h4>
                      {account?.isVerified && (
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{account?.username}</p>
                    {account?.lastUsed && (
                      <p className="text-xs text-muted-foreground">
                        Last used: {new Intl.DateTimeFormat('en-NG', {
                          day: '2-digit',
                          month: 'short'
                        })?.format(new Date(account.lastUsed))}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!account?.isVerified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onManageAccount(account, 'verify')}
                    >
                      Verify
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onManageAccount(account, 'settings')}
                  >
                    <Icon name="Settings" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Stats */}
      {linkedAccounts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">
                {linkedAccounts?.filter(acc => acc?.isVerified)?.length}
              </div>
              <div className="text-xs text-muted-foreground">Verified Accounts</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {linkedAccounts?.length}
              </div>
              <div className="text-xs text-muted-foreground">Total Linked</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountStatus;