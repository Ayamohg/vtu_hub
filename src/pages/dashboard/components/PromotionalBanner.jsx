import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromotionalBanner = ({ 
  promotions = [],
  onPromotionClick = () => {},
  autoSlide = true,
  slideInterval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (autoSlide && promotions?.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promotions?.length);
      }, slideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, promotions?.length, slideInterval]);

  if (promotions?.length === 0) {
    return null;
  }

  const currentPromotion = promotions?.[currentSlide];

  return (
    <div className="relative bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-6 text-accent-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border-2 border-current rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-current rounded-full"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-accent-foreground/20 rounded-full p-2">
              <Icon name={currentPromotion?.icon || "Gift"} size={20} color="currentColor" />
            </div>
            <span className="text-sm font-medium bg-accent-foreground/20 px-3 py-1 rounded-full">
              {currentPromotion?.badge || "Limited Offer"}
            </span>
          </div>
          {promotions?.length > 1 && (
            <div className="flex space-x-1">
              {promotions?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-accent-foreground' 
                      : 'bg-accent-foreground/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 leading-tight">
            {currentPromotion?.title}
          </h3>
          <p className="text-accent-foreground/90 text-sm leading-relaxed">
            {currentPromotion?.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {currentPromotion?.discount && (
              <div className="bg-accent-foreground/20 rounded-lg px-3 py-2">
                <span className="text-lg font-bold">{currentPromotion?.discount}</span>
                <span className="text-sm ml-1">OFF</span>
              </div>
            )}
            {currentPromotion?.validUntil && (
              <div className="flex items-center space-x-1 text-sm">
                <Icon name="Clock" size={14} />
                <span>Valid until {currentPromotion?.validUntil}</span>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            onClick={() => onPromotionClick(currentPromotion)}
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            {currentPromotion?.ctaText || "Claim Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;