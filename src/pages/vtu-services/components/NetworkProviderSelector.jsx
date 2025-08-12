import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkProviderSelector = ({ 
  selectedProvider, 
  onProviderSelect,
  className = '' 
}) => {
  const providers = [
    {
      id: 'mtn',
      name: 'MTN',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-500'
    },
    {
      id: 'airtel',
      name: 'Airtel',
      logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-147413.jpeg?w=100&h=100&fit=crop&crop=center',
      color: 'bg-red-500',
      textColor: 'text-red-600',
      borderColor: 'border-red-500'
    },
    {
      id: 'glo',
      name: 'Glo',
      logo: 'https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=100&h=100&fit=crop&crop=center',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      borderColor: 'border-green-500'
    },
    {
      id: '9mobile',
      name: '9mobile',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-500'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">Select Network Provider</h3>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
        {providers?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => onProviderSelect(provider)}
            className={`
              flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${selectedProvider?.id === provider?.id
                ? `${provider?.borderColor} bg-card shadow-md`
                : 'border-border hover:border-primary/50 bg-card hover:shadow-sm'
              }
            `}
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
              <img 
                src={provider?.logo} 
                alt={`${provider?.name} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`font-semibold ${
                selectedProvider?.id === provider?.id 
                  ? provider?.textColor 
                  : 'text-foreground'
              }`}>
                {provider?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {provider?.name === 'MTN' ? 'Everywhere you go' : 
                 provider?.name === 'Airtel' ? 'The smartphone network' :
                 provider?.name === 'Glo'? 'Rule your world' : 'Get more, pay less'}
              </p>
            </div>
            
            {selectedProvider?.id === provider?.id && (
              <Icon name="CheckCircle" size={20} color={`var(--color-${provider?.color?.split('-')?.[1]}-500)`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NetworkProviderSelector;