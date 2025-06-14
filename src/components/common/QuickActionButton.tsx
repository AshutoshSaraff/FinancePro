
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function QuickActionButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the button when on the agent chat page
  if (location.pathname === '/agent-chat') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        className="w-14 h-14 rounded-full shadow-lg bg-finance-gold text-finance-navy hover:bg-finance-gold/90"
        onClick={() => navigate('/agent-chat')}
        aria-label="Chat with agent"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
