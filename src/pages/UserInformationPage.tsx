
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import QuickActionButton from '@/components/common/QuickActionButton';
import { User } from '@/context/DataContext';

export default function UserInformationPage() {
  const { currentUser, users } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (!currentUser.role.includes('admin')) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || !currentUser.role.includes('admin')) return null;
  
  // Filter users to only show regular users (not admins)
  const regularUsers = users.filter(user => user.role === 'user');
  
  // Filter based on search term
  const filteredUsers = regularUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type="admin" />
        <div className="flex-1 p-3 sm:p-6 md:ml-64 w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-finance-navy">User Information</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">View and manage user accounts</p>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2 px-3 sm:px-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="text-base sm:text-lg font-medium">
                  All Users
                </CardTitle>
                <Input
                  placeholder="Search users..."
                  className="w-full sm:max-w-xs text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Email</TableHead>
                        <TableHead className="hidden md:table-cell text-xs sm:text-sm px-2 sm:px-4">Phone</TableHead>
                        <TableHead className="hidden lg:table-cell text-xs sm:text-sm px-2 sm:px-4">PAN Number</TableHead>
                        <TableHead className="hidden xl:table-cell text-xs sm:text-sm px-2 sm:px-4">Aadhaar Number</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm px-2 sm:px-4">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user: User) => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                            <div className="truncate max-w-[100px] sm:max-w-none">{user.name}</div>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                            <div className="truncate max-w-[120px] sm:max-w-none">{user.email}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                            {user.phone || 'N/A'}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                            {user.panNumber ? 
                              `${user.panNumber.substring(0, 2)}XXXX${user.panNumber.substring(6)}` : 
                              'N/A'}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                            {user.aadhaarNumber ? 
                              `XXXX XXXX ${user.aadhaarNumber.substring(10)}` : 
                              'N/A'}
                          </TableCell>
                          <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-3">
                            <Badge className="bg-green-500 text-xs">Active</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-sm">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
}
