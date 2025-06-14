
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, CreditCard, MessageSquare } from 'lucide-react';

export default function QuickActions() {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: 'Apply for Loan',
      description: 'Submit a new loan application',
      icon: <FileText className="w-8 h-8 text-finance-gold" />,
      color: 'bg-gradient-to-br from-blue-100 to-blue-200',
      path: '/loan-application',
    },
    {
      title: 'Track Applications',
      description: 'View your existing applications',
      icon: <FileText className="w-8 h-8 text-finance-blue" />,
      color: 'bg-gradient-to-br from-green-100 to-green-200',
      path: '/my-applications',
    },
    {
      title: 'Apply for Card',
      description: 'Request a new credit or debit card',
      icon: <CreditCard className="w-8 h-8 text-finance-navy" />,
      color: 'bg-gradient-to-br from-purple-100 to-purple-200',
      path: '/products',
    },
    {
      title: 'Chat with Agent',
      description: 'Get help from our support team',
      icon: <MessageSquare className="w-8 h-8 text-finance-blue" />,
      color: 'bg-gradient-to-br from-amber-100 to-amber-200',
      path: '/agent-chat',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <div 
              key={index}
              className={`${action.color} p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] cursor-pointer`}
              onClick={() => navigate(action.path)}
            >
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-finance-navy">{action.title}</h3>
                  <p className="text-xs text-gray-600 hidden md:block mt-1">{action.description}</p>
                </div>
                <div className="mt-auto flex justify-end pt-2">
                  <ArrowRight className="w-4 h-4 text-finance-navy opacity-70" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
