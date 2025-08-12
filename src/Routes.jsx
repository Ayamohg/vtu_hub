import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VTUServicesPage from './pages/vtu-services';
import BillPayments from './pages/bill-payments';
import LoginRegisterPage from './pages/login-register';
import Dashboard from './pages/dashboard';
import GamingStore from './pages/gaming-store';
import PaymentCards from './pages/payment-cards';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BillPayments />} />
        <Route path="/vtu-services" element={<VTUServicesPage />} />
        <Route path="/bill-payments" element={<BillPayments />} />
        <Route path="/login-register" element={<LoginRegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gaming-store" element={<GamingStore />} />
        <Route path="/payment-cards" element={<PaymentCards />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
