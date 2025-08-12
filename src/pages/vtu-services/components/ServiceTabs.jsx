import React from 'react';

const ServiceTabs = ({ activeTab, onTabChange, className = '' }) => {
  const tabs = [
    { id: 'airtime', label: 'Airtime', icon: '📱' },
    { id: 'data', label: 'Data Bundles', icon: '📊' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-1 ${className}`}>
      <div className="flex">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <span className="text-base">{tab?.icon}</span>
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTabs;