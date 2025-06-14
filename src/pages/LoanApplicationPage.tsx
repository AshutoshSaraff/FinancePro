
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import LoanApplicationForm from '@/components/loan/LoanApplicationForm';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function LoanApplicationPage() {
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
            <h1 className="text-2xl font-bold text-finance-navy">Apply for a Loan</h1>
            <p className="text-gray-600">Fill out the form below to submit your loan application</p>
          </div>
          
          <LoanApplicationForm />
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
