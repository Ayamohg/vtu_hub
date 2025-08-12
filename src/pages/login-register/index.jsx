import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthToggle from './components/AuthToggle';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import AppLogo from './components/AppLogo';

const LoginRegisterPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      // Redirect to dashboard if already authenticated
      window.location.href = '/dashboard';
    }
  }, []);

  const handleAuthSubmit = async (formData) => {
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Mock authentication process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful authentication
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        name: formData.fullName || 'John Doe',
        email: formData.email || formData.phoneOrEmail,
        phone: formData.phoneNumber || formData.phoneOrEmail,
        balance: '₦25,450.00'
      }));

      if (activeTab === 'login') {
        setSuccessMessage('Login successful! Redirecting to dashboard...');
      } else {
        setSuccessMessage('Account created successfully! Redirecting to dashboard...');
      }

    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      // Mock social login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`${provider} login initiated`);
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Login' : 'Register'} - VTU Hub | Digital Payment Solutions</title>
        <meta name="description" content="Secure login and registration for VTU Hub - Nigeria's trusted platform for airtime, data, bill payments, and gaming purchases." />
        <meta name="keywords" content="VTU Hub login, Nigeria digital payments, airtime purchase, data bundles, bill payments" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              {/* App Logo */}
              <AppLogo showTagline={true} />

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-success text-center">{successMessage}</p>
                </div>
              )}

              {/* Auth Form Container */}
              <div className="bg-card border border-border rounded-2xl shadow-lg p-6 lg:p-8">
                {/* Tab Toggle */}
                <AuthToggle activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Form Content */}
                <div className="space-y-6">
                  {activeTab === 'login' ? (
                    <LoginForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
                  ) : (
                    <RegisterForm onSubmit={handleAuthSubmit} isLoading={isLoading} />
                  )}

                  {/* Social Login */}
                  <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
                </div>
              </div>

              {/* Trust Signals */}
              <div className="mt-8">
                <TrustSignals />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 py-6 px-4 text-center border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="max-w-md mx-auto space-y-2">
              <p className="text-sm text-muted-foreground">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Privacy Policy
                </button>
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} VTU Hub. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LoginRegisterPage;