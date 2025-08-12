import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BankIntegration = ({ className = '' }) => {
  const [selectedBank, setSelectedBank] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const supportedBanks = [
    {
      id: 'gtbank',
      name: 'Guaranty Trust Bank',
      shortName: 'GTBank',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
      status: 'connected',
      features: ['Instant Card Linking', 'Real-time Balance', 'Transaction Alerts'],
      description: 'Nigeria\'s leading financial institution with seamless digital banking.',
      connectionDate: '2025-01-15'
    },
    {
      id: 'access',
      name: 'Access Bank',
      shortName: 'Access',
      logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=80&h=80&fit=crop',
      status: 'available',
      features: ['Quick Setup', 'Mobile Banking', 'Secure Payments'],
      description: 'Africa\'s bank of choice for modern banking solutions.',
      connectionDate: null
    },
    {
      id: 'zenith',
      name: 'Zenith Bank',
      shortName: 'Zenith',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=80&fit=crop',
      status: 'available',
      features: ['Digital Banking', 'Card Management', 'Instant Transfers'],
      description: 'Leading Nigerian bank with innovative financial services.',
      connectionDate: null
    },
    {
      id: 'uba',
      name: 'United Bank for Africa',
      shortName: 'UBA',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop',
      status: 'available',
      features: ['Pan-African Banking', 'Digital Solutions', 'Card Services'],
      description: 'Africa\'s global bank with presence across 20+ countries.',
      connectionDate: null
    },
    {
      id: 'firstbank',
      name: 'First Bank of Nigeria',
      shortName: 'FirstBank',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
      status: 'maintenance',
      features: ['Legacy Banking', 'Wide Network', 'Traditional Services'],
      description: 'Nigeria\'s oldest bank with over 125 years of banking excellence.',
      connectionDate: null
    },
    {
      id: 'fidelity',
      name: 'Fidelity Bank',
      shortName: 'Fidelity',
      logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=80&h=80&fit=crop',
      status: 'available',
      features: ['Personal Banking', 'Business Solutions', 'Digital Services'],
      description: 'Your faithful financial partner for all banking needs.',
      connectionDate: null
    }
  ];

  const handleConnect = async (bank) => {
    setSelectedBank(bank?.id);
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setSelectedBank(null);
      // In real app, update bank status to 'connected'
    }, 3000);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bg: 'bg-success/10',
          icon: 'CheckCircle',
          label: 'Connected'
        };
      case 'available':
        return {
          color: 'text-primary',
          bg: 'bg-primary/10',
          icon: 'Plus',
          label: 'Connect'
        };
      case 'maintenance':
        return {
          color: 'text-warning',
          bg: 'bg-warning/10',
          icon: 'AlertTriangle',
          label: 'Maintenance'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bg: 'bg-muted',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Bank Integration</h3>
            <p className="text-sm text-muted-foreground">Connect your Nigerian bank accounts</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {supportedBanks?.filter(bank => bank?.status === 'connected')?.length} connected
          </span>
        </div>
      </div>
      {/* Connected Banks Summary */}
      <div className="mb-6 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">Bank Integration Active</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your connected banks enable instant card linking and real-time transaction processing.
        </p>
      </div>
      {/* Bank List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supportedBanks?.map((bank) => {
          const statusConfig = getStatusConfig(bank?.status);
          const isLoading = isConnecting && selectedBank === bank?.id;
          
          return (
            <div
              key={bank?.id}
              className={`
                border rounded-lg p-4 transition-all duration-200
                ${bank?.status === 'connected' ?'border-success/20 bg-success/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }
                ${bank?.status === 'maintenance' ? 'opacity-60' : ''}
              `}
            >
              {/* Bank Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <img 
                      src={bank?.logo} 
                      alt={`${bank?.name} logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{bank?.shortName}</h4>
                    <p className="text-xs text-muted-foreground">{bank?.name}</p>
                  </div>
                </div>
                
                <div className={`
                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
                  ${statusConfig?.bg} ${statusConfig?.color}
                `}>
                  <Icon name={statusConfig?.icon} size={12} />
                  <span>{statusConfig?.label}</span>
                </div>
              </div>
              {/* Bank Description */}
              <p className="text-sm text-muted-foreground mb-3">
                {bank?.description}
              </p>
              {/* Features */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {bank?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              {/* Connection Info */}
              {bank?.status === 'connected' && bank?.connectionDate && (
                <div className="mb-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                  Connected on {new Date(bank.connectionDate)?.toLocaleDateString('en-GB')}
                </div>
              )}
              {/* Action Button */}
              <div className="flex items-center justify-between">
                {bank?.status === 'connected' ? (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                      iconPosition="left"
                    >
                      Manage
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Unlink"
                      iconPosition="left"
                      className="text-error hover:text-error"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : bank?.status === 'available' ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleConnect(bank)}
                    loading={isLoading}
                    iconName="Plus"
                    iconPosition="left"
                    fullWidth
                  >
                    Connect Bank
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    iconName="AlertTriangle"
                    iconPosition="left"
                    fullWidth
                  >
                    Under Maintenance
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Integration Benefits */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-semibold text-foreground mb-4">Integration Benefits</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h5 className="font-medium text-foreground text-sm">Instant Linking</h5>
              <p className="text-xs text-muted-foreground">
                Connect your cards instantly without manual entry
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Shield" size={16} color="var(--color-success)" />
            </div>
            <div>
              <h5 className="font-medium text-foreground text-sm">Enhanced Security</h5>
              <p className="text-xs text-muted-foreground">
                Bank-grade security with real-time fraud monitoring
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Bell" size={16} color="var(--color-warning)" />
            </div>
            <div>
              <h5 className="font-medium text-foreground text-sm">Real-time Updates</h5>
              <p className="text-xs text-muted-foreground">
                Instant notifications for all transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankIntegration;