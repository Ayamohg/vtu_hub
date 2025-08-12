import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneOrEmail: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.phoneOrEmail) {
      newErrors.phoneOrEmail = 'Phone number or email is required';
    } else if (formData?.phoneOrEmail?.includes('@')) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex?.test(formData?.phoneOrEmail)) {
        newErrors.phoneOrEmail = 'Please enter a valid email address';
      }
    } else {
      // Nigerian phone number validation
      const phoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;
      if (!phoneRegex?.test(formData?.phoneOrEmail?.replace(/\s/g, ''))) {
        newErrors.phoneOrEmail = 'Please enter a valid Nigerian phone number (e.g., +2348012345678)';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      // Mock credentials validation
      const validCredentials = [
        { phoneOrEmail: '+2348012345678', password: 'password123' },
        { phoneOrEmail: 'john@example.com', password: 'password123' },
        { phoneOrEmail: '08012345678', password: 'demo123' }
      ];

      const isValid = validCredentials?.some(
        cred => cred?.phoneOrEmail === formData?.phoneOrEmail && cred?.password === formData?.password
      );

      if (isValid) {
        onSubmit(formData);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setErrors({
          general: 'Invalid credentials. Try: +2348012345678 / password123 or john@example.com / password123'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors?.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        </div>
      )}
      <Input
        label="Phone Number or Email"
        type="text"
        name="phoneOrEmail"
        placeholder="Enter phone number or email"
        value={formData?.phoneOrEmail}
        onChange={handleChange}
        error={errors?.phoneOrEmail}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleChange}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          onClick={() => {
            // Handle forgot password
            alert('Forgot password functionality would be implemented here');
          }}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="h-12"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;