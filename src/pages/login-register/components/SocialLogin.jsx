import React from 'react';

import Button from '../../../components/ui/Button';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
    // Mock social login success
    setTimeout(() => {
      alert(`${provider} login would be implemented here`);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Google')}
          disabled={isLoading}
          className="h-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span>Google</span>
          </div>
        </Button>

        <Button
          variant="outline"
          onClick={() => handleSocialLogin('Facebook')}
          disabled={isLoading}
          className="h-12"
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span>Facebook</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;