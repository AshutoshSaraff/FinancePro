
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApplicationsList from '@/components/applications/ApplicationsList';
import QuickActionButton from '@/components/common/QuickActionButton';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdminDashboard() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (!currentUser.role.includes('admin')) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || !currentUser.role.includes('admin')) return null;
  
  const adminLevel = currentUser.role as 'admin1' | 'admin2' | 'admin3';
  
  const getAdminTitle = () => {
    switch (adminLevel) {
      case 'admin1':
        return 'KYC Intake & Pre-Screening Dashboard';
      case 'admin2':
        return 'CDD (Customer Due Diligence) Verification Dashboard';
      case 'admin3':
        return 'Manager Approval Officer';
      default:
        return 'Administrator';
    }
  };
  
  const getAdminName = () => {
    switch (adminLevel) {
      case 'admin1':
        return 'Ravi Deshmukh';
      case 'admin2':
        return 'Ekta Thakur';
      case 'admin3':
        return 'Arvind Nair';
      default:
        return currentUser.name;
    }
  };
  
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type="admin" />
        <div className={`flex-1 p-4 md:p-6 w-full transition-all duration-300 ${
          isMobile ? 'ml-0' : 'md:ml-64'
        }`}>
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-finance-navy">
              {getGreeting()}, {getAdminName()}!
            </h1>
            <p className="text-sm md:text-base text-gray-600">{getAdminTitle()}</p>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg font-medium">
                Pending Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationsList adminView adminLevel={adminLevel} />
            </CardContent>
          </Card>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
