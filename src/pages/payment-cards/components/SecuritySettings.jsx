import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecuritySettings = ({ className = '' }) => {
  const [settings, setSettings] = useState({
    threeDSecure: true,
    fraudMonitoring: true,
    transactionNotifications: true,
    dailyLimit: 100000,
    weeklyLimit: 500000,
    monthlyLimit: 2000000
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleToggle = (setting) => {
    if (isEditing) {
      setTempSettings(prev => ({
        ...prev,
        [setting]: !prev?.[setting]
      }));
    }
  };

  const handleLimitChange = (limit, value) => {
    setTempSettings(prev => ({
      ...prev,
      [limit]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const securityFeatures = [
    {
      id: 'threeDSecure',
      title: '3D Secure Authentication',
      description: 'Additional verification for online transactions',
      icon: 'Shield',
      enabled: isEditing ? tempSettings?.threeDSecure : settings?.threeDSecure,
      recommended: true
    },
    {
      id: 'fraudMonitoring',
      title: 'Fraud Monitoring',
      description: 'Real-time transaction monitoring for suspicious activity',
      icon: 'Eye',
      enabled: isEditing ? tempSettings?.fraudMonitoring : settings?.fraudMonitoring,
      recommended: true
    },
    {
      id: 'transactionNotifications',
      title: 'Transaction Notifications',
      description: 'Instant SMS and email alerts for all transactions',
      icon: 'Bell',
      enabled: isEditing ? tempSettings?.transactionNotifications : settings?.transactionNotifications,
      recommended: false
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Lock" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your card security preferences</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      {/* Security Features */}
      <div className="space-y-4 mb-6">
        {securityFeatures?.map((feature) => (
          <div
            key={feature?.id}
            className={`
              flex items-center justify-between p-4 border rounded-lg transition-all duration-200
              ${isEditing ? 'cursor-pointer hover:bg-muted/50' : ''}
              ${feature?.enabled ? 'border-success/20 bg-success/5' : 'border-border'}
            `}
            onClick={() => handleToggle(feature?.id)}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${feature?.enabled 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={feature?.icon} size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{feature?.title}</h4>
                  {feature?.recommended && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`
                text-sm font-medium
                ${feature?.enabled ? 'text-success' : 'text-muted-foreground'}
              `}>
                {feature?.enabled ? 'Enabled' : 'Disabled'}
              </span>
              {isEditing && (
                <Icon 
                  name={feature?.enabled ? "ToggleRight" : "ToggleLeft"} 
                  size={24} 
                  color={feature?.enabled ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Transaction Limits */}
      <div className="border-t border-border pt-6">
        <h4 className="font-semibold text-foreground mb-4">Transaction Limits</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Daily Limit
            </label>
            {isEditing ? (
              <Input
                type="number"
                value={tempSettings?.dailyLimit}
                onChange={(e) => handleLimitChange('dailyLimit', e?.target?.value)}
                placeholder="100000"
              />
            ) : (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-mono text-lg font-semibold text-foreground">
                  ₦{settings?.dailyLimit?.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Weekly Limit
            </label>
            {isEditing ? (
              <Input
                type="number"
                value={tempSettings?.weeklyLimit}
                onChange={(e) => handleLimitChange('weeklyLimit', e?.target?.value)}
                placeholder="500000"
              />
            ) : (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-mono text-lg font-semibold text-foreground">
                  ₦{settings?.weeklyLimit?.toLocaleString()}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Monthly Limit
            </label>
            {isEditing ? (
              <Input
                type="number"
                value={tempSettings?.monthlyLimit}
                onChange={(e) => handleLimitChange('monthlyLimit', e?.target?.value)}
                placeholder="2000000"
              />
            ) : (
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-mono text-lg font-semibold text-foreground">
                  ₦{settings?.monthlyLimit?.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {isEditing && (
          <p className="text-xs text-muted-foreground mt-2">
            * Limits are in Nigerian Naira (₦). Changes take effect immediately.
          </p>
        )}
      </div>
      {/* Compliance Badges */}
      <div className="border-t border-border pt-6 mt-6">
        <h4 className="font-semibold text-foreground mb-4">Security Compliance</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Icon name="Shield" size={24} color="var(--color-success)" />
            <span className="text-xs font-medium text-foreground mt-1">PCI DSS</span>
            <span className="text-xs text-success">Compliant</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Icon name="Lock" size={24} color="var(--color-success)" />
            <span className="text-xs font-medium text-foreground mt-1">SSL/TLS</span>
            <span className="text-xs text-success">Encrypted</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Icon name="Eye" size={24} color="var(--color-success)" />
            <span className="text-xs font-medium text-foreground mt-1">CBN</span>
            <span className="text-xs text-success">Approved</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            <span className="text-xs font-medium text-foreground mt-1">2FA</span>
            <span className="text-xs text-success">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;