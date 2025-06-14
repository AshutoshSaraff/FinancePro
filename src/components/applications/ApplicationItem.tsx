
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoanApplication } from '@/context/DataContext';
import { ChevronRight } from 'lucide-react';

interface ApplicationItemProps {
  application: LoanApplication;
  onClick?: () => void;
  showStatus?: boolean;
}

export default function ApplicationItem({ application, onClick, showStatus = true }: ApplicationItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      currencyDisplay: 'symbol'
    }).format(amount).replace('INR', '₹');
  };
  
  const getStatusDisplay = () => {
    if (application.status.current === 'rejected') {
      return <Badge variant="destructive" className="animate-pulse">Rejected</Badge>;
    } else if (application.status.current === 'approved') {
      return <Badge className="bg-green-600 animate-pulse">Approved</Badge>;
    } else {
      let stageBadge;
      
      switch (application.status.currentAdmin) {
        case 'admin1':
          stageBadge = <Badge variant="outline">Stage: KYC Verification</Badge>;
          break;
        case 'admin2':
          stageBadge = <Badge variant="outline">Stage: Employee Review</Badge>;
          break;
        case 'admin3':
          stageBadge = <Badge variant="outline">Stage: Manager Approval</Badge>;
          break;
        default:
          stageBadge = <Badge variant="outline">Processing</Badge>;
      }
      
      return (
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-amber-500 animate-pulse">Processing</Badge>
          {stageBadge}
        </div>
      );
    }
  };
  
  return (
    <Card className="hover-grow card-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{application.category}</h3>
            <div className="text-sm text-gray-500 mt-1">
              Application ID: {application.id}
            </div>
            <div className="text-sm text-gray-500">
              Submitted: {formatDate(application.createdAt)}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="font-bold text-lg">{formatAmount(application.amount)}</div>
            <div className="text-xs text-gray-500">{application.term} months</div>
            {showStatus && (
              <div className="mt-2">
                {getStatusDisplay()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm">{application.purpose}</div>
          <Button variant="ghost" size="icon">
            <ChevronRight size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
