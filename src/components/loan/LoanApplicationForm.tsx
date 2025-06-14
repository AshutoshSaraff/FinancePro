
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const { currentUser, addLoanApplication } = useData();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    purpose: '',
    term: '',
    comment: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to apply for a loan",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!formData.category || !formData.amount || !formData.purpose || !formData.term) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Add the loan application
    addLoanApplication({
      userId: currentUser.id,
      category: formData.category,
      amount: Number(formData.amount),
      purpose: formData.purpose,
      term: Number(formData.term),
      comment: formData.comment,
    });
    
    toast({
      title: "Application Submitted",
      description: "Your loan application has been submitted successfully",
    });
    
    navigate('/my-applications');
  };
  
  const categories = [
    'Personal Loan',
    'Home Loan',
    'Car Loan',
    'Education Loan',
    'Business Loan',
  ];
  
  return (
    <Card className="w-full max-w-2xl mx-auto hover-grow card-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-finance-navy">Loan Application</CardTitle>
        <CardDescription>
          Fill in the details below to apply for a loan. Our team will review your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Loan Category*</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finance-navy"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount (₹)*</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter loan amount"
                min="100"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">Loan Purpose*</Label>
              <Input
                id="purpose"
                name="purpose"
                placeholder="Purpose of the loan"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="term">Loan Term (months)*</Label>
              <Input
                id="term"
                name="term"
                type="number"
                placeholder="Enter loan term in months"
                min="3"
                max="120"
                value={formData.term}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comment">Additional Comments</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Any additional information to support your application"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-gray-600 mb-4">
              By submitting this application, you agree to our terms and conditions.
              Your information will be verified in the approval process.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} className="bg-finance-navy hover:bg-finance-blue">
          Submit Application
        </Button>
      </CardFooter>
    </Card>
  );
}
