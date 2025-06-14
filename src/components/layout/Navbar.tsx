
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, Globe, Package, Info, Phone } from 'lucide-react';

export default function Navbar() {
  const { currentUser, setCurrentUser } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigationItems = [
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Services', path: '/services', icon: Globe },
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Phone }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-finance-navy text-white py-3 px-3 sm:px-4 md:px-6 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        {/* Mobile menu button - only show when logged in */}
        {currentUser && (
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-finance-blue p-1"
              onClick={toggleMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        <h1 
          className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer"
          onClick={() => navigate(currentUser ? (currentUser.role === 'user' ? '/dashboard' : '/admin-dashboard') : '/')}
        >
          FinancePro
        </h1>
      </div>

      {/* Desktop Navigation - Show all items when user is logged in */}
      {currentUser && (
        <div className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              className="text-white hover:bg-finance-blue text-sm px-3 py-2"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      )}

      {/* Right side controls */}
      <div className="flex items-center space-x-2">
        {/* User Profile/Login */}
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative rounded-full h-8 w-8 sm:h-9 sm:w-9 bg-finance-gold text-finance-navy hover:bg-finance-gold/90 text-xs sm:text-sm font-medium"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-4 py-2">
                <p className="font-medium text-sm truncate">{currentUser.name}</p>
                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
              </div>
              <DropdownMenuSeparator />
              
              {/* Navigation items in dropdown - only on mobile */}
              <div className="md:hidden">
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Navigate
                </DropdownMenuLabel>
                {navigationItems.map((item) => (
                  <DropdownMenuItem key={item.path} onClick={() => handleNavigation(item.path)} className="cursor-pointer">
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </div>
              
              <DropdownMenuItem onClick={() => navigate('/user-profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-finance-gold text-finance-navy hover:bg-finance-gold/90 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          >
            Log In
          </Button>
        )}
      </div>

      {/* Mobile menu overlay - only for navigation when not logged in */}
      {isOpen && !currentUser && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-finance-navy z-50 shadow-lg border-t border-finance-blue/30">
          <div className="flex flex-col p-4 space-y-2">
            {navigationItems.map((item) => (
              <Button 
                key={item.path}
                variant="ghost" 
                className="text-white justify-start py-3 hover:bg-finance-blue"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
