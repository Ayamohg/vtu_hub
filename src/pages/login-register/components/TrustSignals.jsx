import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      text: 'CBN Licensed',
      description: 'Central Bank of Nigeria approved'
    },
    {
      icon: 'Lock',
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'CheckCircle',
      text: 'PCI Compliant',
      description: 'Payment card industry certified'
    }
  ];

  const partners = [
    'MTN Nigeria',
    'Airtel Nigeria',
    'Glo Mobile',
    '9mobile'
  ];

  return (
    <div className="space-y-6">
      {/* Security Badges */}
      <div className="grid grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name={badge?.icon} size={20} color="var(--color-success)" />
            </div>
            <p className="text-xs font-medium text-foreground">{badge?.text}</p>
            <p className="text-xs text-muted-foreground mt-1">{badge?.description}</p>
          </div>
        ))}
      </div>
      {/* Partner Networks */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-3">Trusted by leading networks</p>
        <div className="flex flex-wrap justify-center gap-2">
          {partners?.map((partner, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
      {/* Additional Trust Info */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">Over 500,000+ satisfied customers</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;