import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import StoreLogo from '../StoreLogo';

const Header = ({ isCollapsed = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if react-router-dom hooks are available, otherwise provide fallbacks
  let location, navigate;
  try {
    location = useLocation?.() || { pathname: '' };
    navigate = useNavigate?.() || (() => {});
  } catch (error) {
    // Fallback for when react-router-dom is not available
    location = { pathname: '' };
    navigate = () => {};
  }

  const navigationItems = [
    { path: '/dashboard-screen', label: 'হোম', labelEn: 'Dashboard', icon: 'Home' },
    { path: '/contact-management-screen', label: 'যোগাযোগ', labelEn: 'Contacts', icon: 'Users' },
    { path: '/transaction-entry-screen', label: 'লেনদেন', labelEn: 'Transactions', icon: 'Receipt' },
    { path: '/due-list-screen', label: 'বকেয়া', labelEn: 'Due List', icon: 'Clock' },
  ];

  const secondaryItems = [
    { path: '/statement-generation-screen', label: 'রিপোর্ট', labelEn: 'Reports', icon: 'FileText' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <StoreLogo size={40} showText={true} variant="default" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="bangla-text"
            >
              <span className="hidden lg:inline">{item?.label}</span>
              <span className="lg:hidden">{item?.labelEn}</span>
            </Button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              iconName="MoreHorizontal"
              iconSize={16}
            >
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                <div className="py-1">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors bangla-text ${
                        isActive(item?.path) ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      <span className="hidden lg:inline">{item?.label}</span>
                      <span className="lg:hidden">{item?.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          iconName="Menu"
          iconSize={20}
          className="md:hidden touch-target"
        />
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <nav className="px-4 py-2 space-y-1">
            {[...navigationItems, ...secondaryItems]?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center px-3 py-3 rounded-md text-sm transition-colors touch-target bangla-text ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} className="mr-3" />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item?.label}</span>
                  <span className="text-xs opacity-75">{item?.labelEn}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;