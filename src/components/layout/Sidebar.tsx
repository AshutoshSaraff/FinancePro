
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Home, FileText, User, MessageSquare, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  type: 'user' | 'admin';
}

export default function Sidebar({ type }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const userMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Apply for Loan', path: '/loan-application' },
    { icon: FileText, label: 'My Applications', path: '/my-applications' },
    { icon: MessageSquare, label: 'Chat with Agent', path: '/agent-chat' }
  ];
  
  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: FileText, label: 'Loan Applications', path: '/admin-applications' },
    { icon: User, label: 'User Information', path: '/user-information' },
    { icon: MessageSquare, label: 'Chat with Agent', path: '/agent-chat' }
  ];
  
  const menuItems = type === 'user' ? userMenuItems : adminMenuItems;

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex justify-between items-center p-4 border-b border-finance-blue/30">
        {(!collapsed || isMobile) && <span className="font-bold text-lg">Menu</span>}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-finance-blue"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        )}
      </div>
      
      <div className="mt-6 px-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={`w-full justify-start mb-2 ${
              location.pathname === item.path
                ? 'bg-finance-blue text-white'
                : 'text-white hover:bg-finance-blue'
            } ${collapsed && !isMobile ? 'px-2' : 'px-4'}`}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className={`h-5 w-5 ${collapsed && !isMobile ? 'mr-0' : 'mr-2'}`} />
            {(!collapsed || isMobile) && <span>{item.label}</span>}
          </Button>
        ))}
      </div>
      
      <div className="mt-auto p-4 border-t border-finance-blue/30">
        {(!collapsed || isMobile) && currentUser && (
          <div className="text-sm">
            <p className="text-gray-300">Logged in as:</p>
            <p className="font-semibold truncate">{currentUser.name}</p>
            <p className="text-xs text-gray-400">
              {currentUser.role === 'user'
                ? 'User Account'
                : `Admin Level ${currentUser.role.slice(-1)}`}
            </p>
          </div>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 md:hidden bg-finance-navy text-white hover:bg-finance-blue"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-finance-navy text-white p-0 border-finance-blue">
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div
      className={`bg-finance-navy text-white transition-all duration-300 flex flex-col fixed h-full z-40 top-0 left-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      style={{ top: '64px' }}
    >
      <SidebarContent />
    </div>
  );
}
