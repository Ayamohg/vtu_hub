import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceTile = ({ 
  title,
  description,
  icon,
  route,
  recentUsage = null,
  isPopular = false,
  gradient = "from-blue-500 to-blue-600"
}) => {
  return (
    <Link 
      to={route}
      className="group block bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/20"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`bg-gradient-to-br ${gradient} rounded-xl p-3 group-hover:scale-110 transition-transform duration-300`}>
            <Icon name={icon} size={24} color="white" />
          </div>
          {isPopular && (
            <span className="bg-success/10 text-success text-xs font-medium px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          {recentUsage ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">{recentUsage}</span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">Get started</span>
          )}
          <Icon 
            name="ArrowRight" 
            size={16} 
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
          />
        </div>
      </div>
    </Link>
  );
};

export default ServiceTile;