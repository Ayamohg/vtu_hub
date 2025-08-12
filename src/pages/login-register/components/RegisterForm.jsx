import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      const phoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;
      if (!phoneRegex?.test(formData?.phoneNumber?.replace(/\s/g, ''))) {
        newErrors.phoneNumber = 'Please enter a valid Nigerian phone number (e.g., +2348012345678)';
      }
    }

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        placeholder="+234 801 234 5678"
        value={formData?.phoneNumber}
        onChange={handleChange}
        error={errors?.phoneNumber}
        description="We'll send a verification code to this number"
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email address"
        value={formData?.email}
        onChange={handleChange}
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          description="Must be 8+ characters with uppercase, lowercase, and number"
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
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleChange}
        error={errors?.agreeToTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        loading={isLoading}
        fullWidth
        className="h-12"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;