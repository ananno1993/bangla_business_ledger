import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import DueListScreen from './pages/due-list-screen';
import TransactionEntryScreen from './pages/transaction-entry-screen';
import ContactManagementScreen from './pages/contact-management-screen';
import DashboardScreen from './pages/dashboard-screen';
import StatementGenerationScreen from './pages/statement-generation-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContactManagementScreen />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/due-list-screen" element={<DueListScreen />} />
        <Route path="/transaction-entry-screen" element={<TransactionEntryScreen />} />
        <Route path="/contact-management-screen" element={<ContactManagementScreen />} />
        <Route path="/dashboard-screen" element={<DashboardScreen />} />
        <Route path="/statement-generation-screen" element={<StatementGenerationScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
