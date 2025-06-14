
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface OfferItem {
  title: string;
  description: string;
  interestRate: string;
  path: string;
  color: string;
}

export default function OffersList() {
  const navigate = useNavigate();
  
  const offers: OfferItem[] = [
    {
      title: 'Personal Loan',
      description: 'Low interest personal loans for any purpose',
      interestRate: '9.99% p.a.',
      path: '/loan-application?type=personal',
      color: 'border-blue-500',
    },
    {
      title: 'Home Loan',
      description: 'Finance your dream home with competitive rates',
      interestRate: '6.5% p.a.',
      path: '/loan-application?type=home',
      color: 'border-green-500',
    },
    {
      title: 'Car Loan',
      description: 'Get on the road with affordable car financing',
      interestRate: '7.5% p.a.',
      path: '/loan-application?type=car',
      color: 'border-amber-500',
    },
  ];
  
  return (
    <Card className="hover-grow card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Offers for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <Card key={offer.title} className={`border-l-4 ${offer.color}`}>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                <p className="font-medium mb-3">Rate: {offer.interestRate}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full hover:bg-finance-navy hover:text-white"
                  onClick={() => navigate(offer.path)}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
