
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ApplicationsList from '@/components/applications/ApplicationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AdminApplicationsPage() {
  const { currentUser, getAllApplications } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
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
        return 'KYC Verification';
      case 'admin2':
        return 'Employee Review';
      case 'admin3':
        return 'Manager Approval';
      default:
        return 'Review';
    }
  };
  
  // Get all applications
  const allApplications = getAllApplications();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type="admin" />
        <div className={`flex-1 p-4 md:p-6 w-full transition-all duration-300 ${
          isMobile ? 'ml-0' : 'md:ml-64'
        }`}>
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold text-finance-navy">Loan Applications</h1>
            <p className="text-sm md:text-base text-gray-600">Review and process loan applications</p>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg font-medium">
                Applications Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              <Tabs 
                defaultValue="pending" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className={`grid grid-cols-3 mb-4 w-full ${isMobile ? 'text-xs' : ''}`}>
                  <TabsTrigger value="pending" className="text-xs md:text-sm">
                    {isMobile ? 'Pending' : `Pending ${getAdminTitle()}`}
                  </TabsTrigger>
                  <TabsTrigger value="all" className="text-xs md:text-sm">All Applications</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs md:text-sm">
                    {isMobile ? 'History' : 'Application History'}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending">
                  <ApplicationsList adminView adminLevel={adminLevel} />
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="bg-yellow-50 p-3 md:p-4 rounded-md mb-4 text-xs md:text-sm">
                    This view shows all applications in the system, regardless of their status.
                  </div>
                  <ApplicationsList adminView adminLevel={adminLevel} customApplications={allApplications} />
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="rounded-md bg-gray-50 p-3 md:p-4 border">
                    <h3 className="font-medium mb-2 text-sm md:text-base">Application Processing History</h3>
                    <div className="space-y-3 md:space-y-4">
                      {allApplications.map(app => (
                        <div key={app.id} className="p-3 md:p-4 bg-white rounded-md shadow-sm">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                            <div className="flex-1">
                              <p className="font-semibold text-sm md:text-base">Application ID: {app.id}</p>
                              <p className="text-xs md:text-sm text-gray-600">Category: {app.category}</p>
                              <p className="text-xs md:text-sm text-gray-600">Amount: ₹{app.amount.toLocaleString('en-IN')}</p>
                              <p className="text-xs md:text-sm text-gray-600">
                                Created: {app.createdAt.toLocaleDateString('en-IN')}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <span 
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  app.status.current === 'approved' 
                                    ? 'bg-green-100 text-green-800' 
                                    : app.status.current === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {app.status.current === 'approved' 
                                  ? 'Approved' 
                                  : app.status.current === 'rejected'
                                  ? 'Rejected'
                                  : 'Processing'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-4 space-y-2">
                            <div className="flex items-center">
                              <div 
                                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${
                                  app.status.admin1 === 'approved' 
                                    ? 'bg-green-500' 
                                    : app.status.admin1 === 'rejected'
                                    ? 'bg-red-500'
                                    : 'bg-gray-300'
                                }`}
                              ></div>
                              <div className="ml-2 md:ml-3">
                                <p className="text-xs md:text-sm font-medium">KYC Verification</p>
                                <p className="text-xs text-gray-500">
                                  {app.status.admin1 === 'approved' 
                                    ? 'Approved' 
                                    : app.status.admin1 === 'rejected'
                                    ? 'Rejected'
                                    : 'Pending'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="w-0.5 h-3 md:h-4 bg-gray-300 ml-2 md:ml-2.5"></div>
                            
                            <div className="flex items-center">
                              <div 
                                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${
                                  app.status.admin2 === 'approved' 
                                    ? 'bg-green-500' 
                                    : app.status.admin2 === 'rejected'
                                    ? 'bg-red-500'
                                    : 'bg-gray-300'
                                }`}
                              ></div>
                              <div className="ml-2 md:ml-3">
                                <p className="text-xs md:text-sm font-medium">Employee Review</p>
                                <p className="text-xs text-gray-500">
                                  {app.status.admin2 === 'approved' 
                                    ? 'Approved' 
                                    : app.status.admin2 === 'rejected'
                                    ? 'Rejected'
                                    : 'Pending'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="w-0.5 h-3 md:h-4 bg-gray-300 ml-2 md:ml-2.5"></div>
                            
                            <div className="flex items-center">
                              <div 
                                className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${
                                  app.status.admin3 === 'approved' 
                                    ? 'bg-green-500' 
                                    : app.status.admin3 === 'rejected'
                                    ? 'bg-red-500'
                                    : 'bg-gray-300'
                                }`}
                              ></div>
                              <div className="ml-2 md:ml-3">
                                <p className="text-xs md:text-sm font-medium">Manager Approval</p>
                                <p className="text-xs text-gray-500">
                                  {app.status.admin3 === 'approved' 
                                    ? 'Approved' 
                                    : app.status.admin3 === 'rejected'
                                    ? 'Rejected'
                                    : 'Pending'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
