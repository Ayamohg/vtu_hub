import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalHeader = ({ 
  user = { name: 'John Doe', balance: '₦25,450.00' },
  notifications = 3,
  onNotificationClick = () => {},
  onProfileClick = () => {},
  onMenuToggle = () => {},
  isMobileMenuOpen = false
}) => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isAuthPage = location?.pathname === '/login-register';

  if (isAuthPage) {
    return null;
  }

  const Logo = () => (
    <Link to="/dashboard" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" />
      </div>
      <span className="text-xl font-bold text-foreground">VTU Hub</span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation & User Info */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Balance Display */}
          <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
            <Icon name="Wallet" size={16} color="var(--color-primary)" />
            <span className="font-mono text-sm font-medium text-foreground">
              {user?.balance}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNotificationClick}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </Button>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="text-sm font-medium text-foreground">{user?.name}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal py-2 z-50">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </Link>
                <hr className="my-2 border-border" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    // Handle logout
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-muted w-full text-left"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          {/* Mobile Balance */}
          <div className="flex items-center space-x-1 bg-muted px-2 py-1 rounded">
            <Icon name="Wallet" size={14} color="var(--color-primary)" />
            <span className="font-mono text-xs font-medium text-foreground">
              {user?.balance}
            </span>
          </div>

          {/* Mobile Notifications */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="relative"
          >
            <Icon name="Bell" size={18} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background z-40">
          <div className="p-4 space-y-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">Account Balance</p>
                <p className="font-mono text-sm font-medium text-primary">{user?.balance}</p>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-3 text-foreground hover:bg-muted rounded-lg"
                onClick={onMenuToggle}
              >
                <Icon name="User" size={20} />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-3 text-foreground hover:bg-muted rounded-lg"
                onClick={onMenuToggle}
              >
                <Icon name="Settings" size={20} />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  onMenuToggle();
                  // Handle logout
                }}
                className="flex items-center space-x-3 p-3 text-error hover:bg-muted rounded-lg w-full text-left"
              >
                <Icon name="LogOut" size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;