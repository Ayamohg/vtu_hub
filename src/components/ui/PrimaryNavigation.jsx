import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = ({ className = '' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Account overview and quick actions'
    },
    {
      label: 'VTU Services',
      path: '/vtu-services',
      icon: 'Smartphone',
      tooltip: 'Airtime and data purchases'
    },
    {
      label: 'Bill Payments',
      path: '/bill-payments',
      icon: 'Receipt',
      tooltip: 'Utility and service payments'
    },
    {
      label: 'Gaming',
      path: '/gaming-store',
      icon: 'Gamepad2',
      tooltip: 'Gaming content and purchases'
    },
    {
      label: 'Cards',
      path: '/payment-cards',
      icon: 'CreditCard',
      tooltip: 'Payment method management'
    }
  ];

  const isAuthPage = location?.pathname === '/login-register';

  if (isAuthPage) {
    return null;
  }

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      {/* Desktop Navigation - Integrated in Header */}
      <nav className={`hidden lg:flex items-center space-x-1 ${className}`}>
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            title={item?.tooltip}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive(item?.path)
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon 
              name={item?.icon} 
              size={18} 
              color={isActive(item?.path) ? 'currentColor' : 'currentColor'} 
            />
            <span>{item?.label}</span>
          </Link>
        ))}
      </nav>
      {/* Mobile Navigation - Bottom Tabs */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[998] bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200
                ${isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
                }
              `}
            >
              <div className={`
                p-1.5 rounded-lg transition-all duration-200
                ${isActive(item?.path)
                  ? 'bg-primary/10' :'hover:bg-muted'
                }
              `}>
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  color="currentColor"
                />
              </div>
              <span className={`
                text-xs font-medium mt-1 truncate max-w-full
                ${isActive(item?.path) ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {item?.label === 'VTU Services' ? 'VTU' : 
                 item?.label === 'Bill Payments' ? 'Bills' : 
                 item?.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavigation;