
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function UserProfilePage() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;

  // Different profile data based on user role
  const getProfileData = () => {
    if (currentUser.role === 'user') {
      // For regular user, use the current user data
      return {
        basicInfo: [
          { label: 'Full Name', value: currentUser.name },
          { label: 'Email', value: currentUser.email },
          { label: 'Phone', value: currentUser.phone || 'Not provided' },
          { label: 'Age', value: currentUser.age || 'Not provided' },
          { label: 'Gender', value: currentUser.gender || 'Not provided' },
        ],
        additionalInfo: [
          { label: 'Marital Status', value: currentUser.maritalStatus || 'Not provided' },
          { label: 'Occupation', value: currentUser.occupation || 'Not provided' },
        ],
        identityInfo: [
          { label: 'PAN Number', value: currentUser.panNumber ? `${currentUser.panNumber.substring(0, 2)}XXXX${currentUser.panNumber.substring(6)}` : 'Not provided' },
          { label: 'Aadhaar Number', value: currentUser.aadhaarNumber ? `XXXX XXXX ${currentUser.aadhaarNumber.substring(10)}` : 'Not provided' },
        ],
        addressInfo: [
          { label: 'Address', value: currentUser.address || 'Not provided' },
        ],
        accountInfo: [
          { label: 'Account Type', value: 'Personal Account' },
          { label: 'Balance', value: currentUser.balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) },
        ],
      };
    } 
    else if (currentUser.role === 'admin1') {
      // For KYC officer
      return {
        basicInfo: [
          { label: 'Full Name', value: 'Ravi Deshmukh' },
          { label: 'Email', value: 'ravi.deshmukh@example.com' },
          { label: 'Phone', value: '+91-9876543210' },
          { label: 'Gender', value: 'Male' },
        ],
        additionalInfo: [
          { label: 'Marital Status', value: 'Single' },
          { label: 'Occupation', value: 'Account Executive' },
          { label: 'Department', value: 'Loan Verification' },
        ],
        identityInfo: [
          { label: 'PAN Number', value: 'ABXXXX234F' },
          { label: 'Aadhaar Number', value: '1234 XXXX X123' },
        ],
        addressInfo: [
          { label: 'Address', value: 'Plot No 12, Ganesh Nagar, Pune, Maharashtra - 440015' },
        ],
        accountInfo: [
          { label: 'Account Type', value: 'Administrator' },
        ],
      };
    }
    else if (currentUser.role === 'admin2') {
      // For employee level admin
      return {
        basicInfo: [
          { label: 'Full Name', value: 'Ekta Thakur' },
          { label: 'Email', value: 'ekat.thakur@bankindia.com' },
          { label: 'Phone', value: '+91-9123456789' },
          { label: 'Gender', value: 'Female' },
          { label: 'Date of Birth', value: '1988-07-21' },
        ],
        additionalInfo: [
          { label: 'Marital Status', value: 'Married' },
          { label: 'Occupation', value: 'Credit Analyst' },
          { label: 'Department', value: 'Loan Verification' },
        ],
        identityInfo: [
          { label: 'PAN Number', value: 'XYXXXX678C' },
          { label: 'Aadhaar Number', value: '8765 XXXX X987' },
        ],
        addressInfo: [
          { label: 'Address', value: 'C-22, Malviya Nagar, Pune - 411441' },
        ],
        accountInfo: [
          { label: 'Account Type', value: 'Administrator' },
        ],
      };
    }
    else if (currentUser.role === 'admin3') {
      // For manager level admin
      return {
        basicInfo: [
          { label: 'Full Name', value: 'Arvind Nair' },
          { label: 'Email', value: 'arvind.nair@bankauthority.com' },
          { label: 'Phone', value: '+91-9001234567' },
          { label: 'Gender', value: 'Male' },
          { label: 'Date of Birth', value: '1980-01-15' },
        ],
        additionalInfo: [
          { label: 'Marital Status', value: 'Married' },
          { label: 'Occupation', value: 'Senior Risk Manager' },
          { label: 'Department', value: 'Risk & Compliance' },
        ],
        identityInfo: [
          { label: 'PAN Number', value: 'LMXXXX345Q' },
          { label: 'Aadhaar Number', value: '6543 XXXX X765' },
        ],
        addressInfo: [
          { label: 'Address', value: 'Flat X11, Orchid Residency, Pune, Maharashtra - 411045' },
        ],
        accountInfo: [
          { label: 'Account Type', value: 'Administrator' },
        ],
      };
    }
  };
  
  const profileData = getProfileData();
  const isAdmin = currentUser.role !== 'user';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type={currentUser.role === 'user' ? 'user' : 'admin'} />
        <div className="flex-1 p-6 md:ml-64 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-finance-navy">User Profile</h1>
            <p className="text-gray-600">Your personal information</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-grow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.basicInfo.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{item.label}</span>
                      <span className="text-base">{item.value}</span>
                      {index < profileData.basicInfo.length - 1 && <Separator className="mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {!isAdmin && (
              <Card className="hover-grow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.accountInfo.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">{item.label}</span>
                        <span className="text-base">{item.value}</span>
                        {index < profileData.accountInfo.length - 1 && <Separator className="mt-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isAdmin && (
              <Card className="hover-grow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.accountInfo.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">{item.label}</span>
                        <span className="text-base">{item.value}</span>
                        {index < profileData.accountInfo.length - 1 && <Separator className="mt-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Card className="hover-grow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Identity Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileData.identityInfo.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{item.label}</span>
                      <span className="text-base">{item.value}</span>
                      {index < profileData.identityInfo.length - 1 && <Separator className="mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-grow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...profileData.additionalInfo, ...profileData.addressInfo].map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{item.label}</span>
                      <span className="text-base">{item.value}</span>
                      {index < profileData.additionalInfo.length + profileData.addressInfo.length - 1 && <Separator className="mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
