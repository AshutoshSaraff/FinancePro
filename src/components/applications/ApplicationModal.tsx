
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useData } from '@/context/DataContext';
import { LoanApplication } from '@/context/DataContext';
import { toast } from '@/hooks/use-toast';

interface ApplicationModalProps {
  application: LoanApplication;
  isOpen: boolean;
  onClose: () => void;
  adminLevel: 'admin1' | 'admin2' | 'admin3';
}

export default function ApplicationModal({ application, isOpen, onClose, adminLevel }: ApplicationModalProps) {
  const { updateApplicationStatus, getUserById } = useData();
  const [rejectionReason, setRejectionReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'rejected' | 'approved'>('idle');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  
  // Get user details for the application
  const user = getUserById(application.userId);
  
  const handleStatusUpdate = (newStatus: 'rejected' | 'approved') => {
    setStatus(newStatus);
    
    if (newStatus === 'approved') {
      // For approval, we don't need to pass a comment
      updateApplicationStatus(application.id, adminLevel, 'approved');
      toast({
        title: "Application approved!",
        description: "The application has been moved to the next stage."
      });
      onClose();
    } else if (newStatus === 'rejected') {
      // Show rejection dialog to collect the reason
      setShowRejectionDialog(true);
    }
  };

  const submitRejection = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide a reason for rejecting this application.",
        variant: "destructive"
      });
      return;
    }

    // For rejection, pass the rejectionReason as the fourth parameter
    updateApplicationStatus(application.id, adminLevel, 'rejected', rejectionReason);
    toast({
      title: "Application rejected!",
      description: "The application has been rejected with provided reason."
    });
    setShowRejectionDialog(false);
    onClose();
  };

  const cancelRejection = () => {
    setShowRejectionDialog(false);
    setStatus('idle');
    setRejectionReason('');
  };

  return (
    <>
      <Dialog open={isOpen && !showRejectionDialog} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Loan Application</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Applicant</h3>
                <p>{user?.name || 'Unknown User'}</p>
                <p className="text-sm text-muted-foreground">{user?.email || 'No email provided'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Loan Details</h3>
                <p>Amount: ₹{application.amount.toLocaleString()}</p>
                <p>Term: {application.term} {application.term > 1 ? 'years' : 'year'}</p>
                <p>Purpose: {application.purpose}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>Current: {application.status.current}</p>
              {application.comment && (
                <>
                  <h3 className="font-semibold mt-2">Rejection Reason</h3>
                  <p className="text-red-500">{application.comment}</p>
                </>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleStatusUpdate('rejected')}
            >
              Reject
            </Button>
            <Button onClick={() => handleStatusUpdate('approved')}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRejectionDialog} onOpenChange={cancelRejection}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provide Rejection Reason</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="rejectionReason">Reason for Rejection</Label>
            <Textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please explain why this application is being rejected"
              className="mt-2 h-32"
              required
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={cancelRejection}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={submitRejection}
              disabled={!rejectionReason.trim()}
            >
              Submit Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
