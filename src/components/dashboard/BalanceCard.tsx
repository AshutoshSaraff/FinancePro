
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BalanceCard() {
  const { currentUser } = useData();
  const [showBalance, setShowBalance] = useState(false);
  
  if (!currentUser) return null;
  
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(currentUser.balance);
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  
  const maskedCardNumber = "•••• •••• •••• 1234";
  
  return (
    <Card className="bg-finance-blue text-white hover-grow card-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Available Balance</CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white" 
            onClick={toggleBalanceVisibility}
          >
            {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">
          {showBalance ? formattedBalance : '•••••••'}
        </div>
        <div className="flex items-center text-sm text-gray-200">
          <CreditCard size={16} className="mr-2" />
          <span>{maskedCardNumber}</span>
        </div>
      </CardContent>
    </Card>
  );
}
