import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAutoToast } from "@/hooks/useAutoToast";
import { useData } from '@/context/DataContext';
import { Switch } from "@/components/ui/switch";

export default function AuthForm() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminLevel, setAdminLevel] = useState<'admin1' | 'admin2' | 'admin3'>('admin1');
  
  const { users, setCurrentUser } = useData();
  const { showAutoToast } = useAutoToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - in a real app, this would validate against a backend
    if (isAdmin) {
      // For admin logins
      const adminEmail = adminLevel === 'admin1' ? 'admin1@example.com' : 
                         adminLevel === 'admin2' ? 'admin2@example.com' : 'admin3@example.com';
      
      // Check if entered email matches the expected admin email
      if (email === adminEmail && password === 'admin') {
        const admin = users.find(u => u.email === email);
        
        if (admin) {
          setCurrentUser(admin);
          showAutoToast({
            title: "Admin Login Successful",
            description: `Welcome back, ${admin.name}!`,
            duration: 2000
          });
          navigate('/admin-dashboard');
        } else {
          showAutoToast({
            title: "Login Failed",
            description: "Invalid admin credentials",
            variant: "destructive",
            duration: 2000
          });
        }
      } else {
        showAutoToast({
          title: "Login Failed",
          description: "Invalid admin credentials",
          variant: "destructive",
          duration: 2000
        });
      }
    } else {
      // For user logins - match any user by email
      const user = users.find(u => u.email === email && u.role === 'user');
      
      if (user && password === 'user') { // Simple password check
        setCurrentUser(user);
        showAutoToast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
          duration: 2000
        });
        navigate('/dashboard');
      } else {
        showAutoToast({
          title: "Login Failed",
          description: "Invalid user credentials",
          variant: "destructive",
          duration: 2000
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-finance-navy">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>
        <p className="mt-2 text-gray-600">
          Enter your credentials to access your account
        </p>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <span className={`${!isAdmin ? 'font-bold text-finance-navy' : 'text-gray-500'}`}>User</span>
        <Switch 
          id="login-type" 
          checked={isAdmin}
          onCheckedChange={(checked) => setIsAdmin(checked)}
        />
        <span className={`${isAdmin ? 'font-bold text-finance-navy' : 'text-gray-500'}`}>Admin</span>
      </div>
      
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
              placeholder={isAdmin ? 
                (adminLevel === 'admin1' ? 'admin1@example.com' : 
                 adminLevel === 'admin2' ? 'admin2@example.com' : 'admin3@example.com') 
                : 'user@example.in'}
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
              placeholder="Password"
            />
            <p className="mt-1 text-xs text-gray-500">
              For demo: use password "{isAdmin ? 'admin' : 'user'}"
            </p>
          </div>
          
          {isAdmin && (
            <div>
              <Label htmlFor="admin-level">Admin Level</Label>
              <select
                id="admin-level"
                value={adminLevel}
                onChange={(e) => setAdminLevel(e.target.value as 'admin1' | 'admin2' | 'admin3')}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="admin1">Level 1 (KYC Verification)</option>
                <option value="admin2">Level 2 (Employee Approval)</option>
                <option value="admin3">Level 3 (Manager Approval)</option>
              </select>
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full bg-finance-navy hover:bg-finance-blue">
          Log In
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Demo accounts:
          <br />
          User: rajesh.kumar@example.in, priya.sharma@example.in, etc. / Password: user
          <br />
          Admin: admin1@example.com, admin2@example.com, admin3@example.com / Password: admin
        </p>
      </div>
    </div>
  );
}
