import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AppLogo = ({ showTagline = true }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="Zap" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">VTU Hub</h1>
            {showTagline && (
              <p className="text-sm text-muted-foreground">Digital Payment Solutions</p>
            )}
          </div>
        </div>
      </Link>
      
      {showTagline && (
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Your trusted platform for airtime, data, bills, and gaming purchases in Nigeria
        </p>
      )}
    </div>
  );
};

export default AppLogo;