
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import BalanceCard from '@/components/dashboard/BalanceCard';
import QuickActions from '@/components/dashboard/QuickActions';
import ServiceIcons from '@/components/dashboard/ServiceIcons';
import TransactionsList from '@/components/dashboard/TransactionsList';
import OffersList from '@/components/dashboard/OffersList';
import QuickActionButton from '@/components/common/QuickActionButton';
import { useIsMobile } from '@/hooks/use-mobile';

export default function UserDashboard() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'user') {
      navigate('/admin-dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex relative">
        <Sidebar type="user" />
        <div className={`flex-1 p-4 md:p-6 w-full transition-all duration-300 ${
          isMobile ? 'ml-0' : 'md:ml-64'
        }`}>
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-finance-navy dark:text-white">
              {getGreeting()}, {currentUser.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Welcome to your dashboard</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <BalanceCard />
            <QuickActions />
          </div>
          
          <div className="mb-4 md:mb-6">
            <ServiceIcons />
          </div>
          
          <div className="mb-4 md:mb-6">
            <TransactionsList />
          </div>
          
          <div>
            <OffersList />
          </div>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
