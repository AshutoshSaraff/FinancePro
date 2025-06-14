
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import AgentChat from '@/components/agent/AgentChat';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function AgentChatPage() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type={currentUser.role === 'user' ? 'user' : 'admin'} />
        <div className="flex-1 p-6 md:ml-64 w-full">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-finance-navy">Chat with Agent</h1>
            <p className="text-gray-600">Get assistance or check your application status</p>
          </div>
          
          <AgentChat />
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
