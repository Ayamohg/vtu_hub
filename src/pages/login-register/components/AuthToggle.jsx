import React from 'react';

const AuthToggle = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      <button
        onClick={() => onTabChange('login')}
        className={`
          flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200
          ${activeTab === 'login' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        Login
      </button>
      <button
        onClick={() => onTabChange('register')}
        className={`
          flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200
          ${activeTab === 'register' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }
        `}
      >
        Register
      </button>
    </div>
  );
};

export default AuthToggle;