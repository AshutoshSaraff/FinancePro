
import { LoanApplication, useData } from '@/context/DataContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle } from 'lucide-react';

interface ApplicationDetailsProps {
  application: LoanApplication;
  adminView?: boolean;
  adminLevel?: 'admin1' | 'admin2' | 'admin3';
}

export default function ApplicationDetails({
  application,
  adminView = false,
  adminLevel,
}: ApplicationDetailsProps) {
  const { updateApplicationStatus, users } = useData();
  const { toast } = useToast();
  
  const applicant = users.find((user) => user.id === application.userId);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  const handleApprove = () => {
    if (!adminLevel) return;
    
    updateApplicationStatus(application.id, adminLevel, 'approved');
    
    toast({
      title: "Application Approved",
      description: `You have approved the loan application ${application.id}`,
    });
  };
  
  const handleReject = () => {
    if (!adminLevel) return;
    
    updateApplicationStatus(application.id, adminLevel, 'rejected');
    
    toast({
      title: "Application Rejected",
      description: `You have rejected the loan application ${application.id}`,
      variant: "destructive",
    });
  };
  
  const getAdminBadges = () => {
    return (
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="text-center">
          <Badge className={
            application.status.admin1 === 'approved' 
              ? "bg-green-600 mb-1" 
              : application.status.admin1 === 'rejected' 
                ? "bg-red-600 mb-1" 
                : "bg-gray-400 mb-1"
          }>
            {application.status.admin1 === 'approved' 
              ? "Approved" 
              : application.status.admin1 === 'rejected' 
                ? "Rejected" 
                : "Pending"}
          </Badge>
          <div className="text-xs">KYC Verification</div>
        </div>
        
        <div className="text-center">
          <Badge className={
            application.status.admin2 === 'approved' 
              ? "bg-green-600 mb-1" 
              : application.status.admin2 === 'rejected' 
                ? "bg-red-600 mb-1" 
                : "bg-gray-400 mb-1"
          }>
            {application.status.admin2 === 'approved' 
              ? "Approved" 
              : application.status.admin2 === 'rejected' 
                ? "Rejected" 
                : "Pending"}
          </Badge>
          <div className="text-xs">Employee Review</div>
        </div>
        
        <div className="text-center">
          <Badge className={
            application.status.admin3 === 'approved' 
              ? "bg-green-600 mb-1" 
              : application.status.admin3 === 'rejected' 
                ? "bg-red-600 mb-1" 
                : "bg-gray-400 mb-1"
          }>
            {application.status.admin3 === 'approved' 
              ? "Approved" 
              : application.status.admin3 === 'rejected' 
                ? "Rejected" 
                : "Pending"}
          </Badge>
          <div className="text-xs">Manager Approval</div>
        </div>
      </div>
    );
  };
  
  const canTakeAction = () => {
    if (!adminLevel || !adminView) return false;
    return application.status.currentAdmin === adminLevel;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl font-bold">
            Loan Application Details
          </CardTitle>
          <Badge
            className={
              application.status.current === 'approved'
                ? 'bg-green-600'
                : application.status.current === 'rejected'
                ? 'bg-red-600'
                : 'bg-amber-500'
            }
          >
            {application.status.current === 'approved'
              ? 'Approved'
              : application.status.current === 'rejected'
              ? 'Rejected'
              : 'Processing'}
          </Badge>
        </div>
        <CardDescription>
          Application ID: {application.id} | Submitted: {formatDate(application.createdAt)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {adminView && applicant && (
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Applicant Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p>{applicant.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p>{applicant.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500">Category</label>
            <p className="font-medium">{application.category}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Amount</label>
            <p className="font-medium">{formatAmount(application.amount)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Purpose</label>
            <p className="font-medium">{application.purpose}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Term</label>
            <p className="font-medium">{application.term} months</p>
          </div>
        </div>
        
        {application.comment && (
          <div>
            <label className="text-sm text-gray-500">Additional Comments</label>
            <p>{application.comment}</p>
          </div>
        )}
        
        <div>
          <h3 className="font-medium mb-2">Approval Status</h3>
          {getAdminBadges()}
        </div>
      </CardContent>
      
      {adminView && canTakeAction() && (
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            onClick={handleReject}
          >
            <XCircle size={16} className="mr-1" /> Reject
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleApprove}
          >
            <CheckCircle size={16} className="mr-1" /> Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
