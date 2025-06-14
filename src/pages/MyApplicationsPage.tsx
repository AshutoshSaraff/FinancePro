
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ApplicationsList from '@/components/applications/ApplicationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function MyApplicationsPage() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'user') {
      navigate('/admin-dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type="user" />
        <div className="flex-1 p-6 md:ml-64 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-finance-navy">My Applications</h1>
            <p className="text-gray-600">Track the status of your loan applications</p>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Your Loan Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationsList />
            </CardContent>
          </Card>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
