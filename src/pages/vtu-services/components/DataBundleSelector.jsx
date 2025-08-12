import React from 'react';
import Icon from '../../../components/AppIcon';

const DataBundleSelector = ({ 
  selectedBundle, 
  onBundleSelect, 
  selectedProvider,
  className = '' 
}) => {
  const getDataBundles = (providerId) => {
    const bundles = {
      mtn: [
        { id: 'mtn_1gb_30', data: '1GB', validity: '30 days', price: 350, popular: false },
        { id: 'mtn_2gb_30', data: '2GB', validity: '30 days', price: 700, popular: true },
        { id: 'mtn_3gb_30', data: '3GB', validity: '30 days', price: 1000, popular: false },
        { id: 'mtn_5gb_30', data: '5GB', validity: '30 days', price: 1500, popular: true },
        { id: 'mtn_10gb_30', data: '10GB', validity: '30 days', price: 2500, popular: false },
        { id: 'mtn_20gb_30', data: '20GB', validity: '30 days', price: 4000, popular: false }
      ],
      airtel: [
        { id: 'airtel_1gb_30', data: '1GB', validity: '30 days', price: 300, popular: false },
        { id: 'airtel_2gb_30', data: '2GB', validity: '30 days', price: 600, popular: true },
        { id: 'airtel_3gb_30', data: '3GB', validity: '30 days', price: 900, popular: false },
        { id: 'airtel_5gb_30', data: '5GB', validity: '30 days', price: 1400, popular: true },
        { id: 'airtel_10gb_30', data: '10GB', validity: '30 days', price: 2300, popular: false },
        { id: 'airtel_15gb_30', data: '15GB', validity: '30 days', price: 3500, popular: false }
      ],
      glo: [
        { id: 'glo_1gb_30', data: '1GB', validity: '30 days', price: 320, popular: false },
        { id: 'glo_2gb_30', data: '2GB', validity: '30 days', price: 650, popular: true },
        { id: 'glo_3gb_30', data: '3GB', validity: '30 days', price: 950, popular: false },
        { id: 'glo_5gb_30', data: '5GB', validity: '30 days', price: 1450, popular: true },
        { id: 'glo_10gb_30', data: '10GB', validity: '30 days', price: 2400, popular: false },
        { id: 'glo_25gb_30', data: '25GB', validity: '30 days', price: 4500, popular: false }
      ],
      '9mobile': [
        { id: '9mobile_1gb_30', data: '1GB', validity: '30 days', price: 280, popular: false },
        { id: '9mobile_2gb_30', data: '2GB', validity: '30 days', price: 580, popular: true },
        { id: '9mobile_3gb_30', data: '3GB', validity: '30 days', price: 880, popular: false },
        { id: '9mobile_5gb_30', data: '5GB', validity: '30 days', price: 1350, popular: true },
        { id: '9mobile_10gb_30', data: '10GB', validity: '30 days', price: 2200, popular: false },
        { id: '9mobile_20gb_30', data: '20GB', validity: '30 days', price: 3800, popular: false }
      ]
    };
    
    return bundles?.[providerId] || [];
  };

  const bundles = selectedProvider ? getDataBundles(selectedProvider?.id) : [];

  if (!selectedProvider) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Icon name="Smartphone" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">Please select a network provider first</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h4 className="text-base font-semibold text-foreground">
          {selectedProvider?.name} Data Bundles
        </h4>
        <span className="text-sm text-muted-foreground">
          {bundles?.length} plans available
        </span>
      </div>
      <div className="grid gap-3">
        {bundles?.map((bundle) => (
          <button
            key={bundle?.id}
            onClick={() => onBundleSelect(bundle)}
            className={`
              relative flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all duration-200
              ${selectedBundle?.id === bundle?.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50 bg-card hover:shadow-sm'
              }
            `}
          >
            {/* Popular Badge */}
            {bundle?.popular && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}

            <div className="flex items-center space-x-4 flex-1">
              <div className={`
                w-12 h-12 rounded-lg flex items-center justify-center
                ${selectedBundle?.id === bundle?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name="Wifi" size={20} />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h5 className="font-semibold text-foreground">{bundle?.data}</h5>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{bundle?.validity}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Valid for {bundle?.validity} from activation
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg text-foreground">₦{bundle?.price?.toLocaleString()}</p>
              {selectedBundle?.id === bundle?.id && (
                <Icon name="CheckCircle" size={16} color="var(--color-primary)" className="ml-auto mt-1" />
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Bundle Info */}
      {selectedBundle && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Bundle Details</p>
              <p>• Data will be credited immediately after successful payment</p>
              <p>• Valid for {selectedBundle?.validity} from activation date</p>
              <p>• Auto-renewal available in settings</p>
              <p>• Check balance by dialing *131# ({selectedProvider?.name})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBundleSelector;