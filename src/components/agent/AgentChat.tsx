import { useState } from 'react';
import { useData, LoanApplication } from '@/context/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import ApplicationItem from '@/components/applications/ApplicationItem';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

interface Step {
  id: string;
  type: 'message' | 'options' | 'applications';
  content: string;
  options?: { label: string; value: string; next: string }[];
}

export default function AgentChat() {
  const { currentUser, getUserApplications } = useData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: `Hello ${currentUser?.name || 'there'}! I'm your financial assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  
  const flowSteps: Record<string, Step> = {
    menu: {
      id: 'menu',
      type: 'options',
      content: "Please select an option:",
      options: [
        { label: "Track application status", value: "track", next: "track" },
        { label: "Need help? Contact support", value: "support", next: "support" },
      ],
    },
    track: {
      id: 'track',
      type: 'applications',
      content: "Here are your applications:",
    },
    support: {
      id: 'support',
      type: 'message',
      content: "For immediate assistance, please call our support team at 1-800-123-4567 or email us at support@financepro.com.",
    },
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate delay for agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        content: "I'll help you with that. Let me check what options we have.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      setStep('menu');
    }, 1000);
  };
  
  const handleOptionSelect = (option: { label: string; value: string; next: string }) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: option.label,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate delay for agent response
    setTimeout(() => {
      const nextStep = flowSteps[option.next];
      
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        content: nextStep.content,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      setStep(nextStep.id);
    }, 1000);
  };
  
  const handleApplicationSelect = (application: LoanApplication) => {
    setSelectedApplication(application);
    
    const agentMessage: Message = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      content: `Application ID: ${application.id} - ${application.category}\n\nStatus: ${
        application.status.current === 'approved'
          ? 'Approved'
          : application.status.current === 'rejected'
          ? 'Rejected'
          : 'In Review'
      }\n\n${getStatusDescription(application)}`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, agentMessage]);
    setStep(null);
  };
  
  const getStatusDescription = (application: LoanApplication) => {
    if (application.status.current === 'rejected') {
      return `Unfortunately, your application has been declined. ${application.comment ? `Reason: ${application.comment}` : ''}`;
    } else if (application.status.current === 'approved') {
      return 'Congratulations! Your loan has been approved. The funds will be credited to your account within 2-3 business days.';
    } else {
      switch (application.status.currentAdmin) {
        case 'admin1':
          return 'Your application is currently under KYC verification (Stage 1 of 3).';
        case 'admin2':
          return 'Your application has passed KYC verification and is now under employee review (Stage 2 of 3).';
        case 'admin3':
          return 'Your application has passed employee review and is now awaiting final manager approval (Stage 3 of 3).';
        default:
          return 'Your application is being processed.';
      }
    }
  };
  
  const applications = currentUser ? getUserApplications(currentUser.id) : [];

  const renderApplicationStatus = (app: LoanApplication) => {
    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <div 
            className={`w-5 h-5 rounded-full ${
              app.status.admin1 === 'approved' 
                ? 'bg-green-500' 
                : app.status.admin1 === 'rejected'
                ? 'bg-red-500'
                : 'bg-gray-300 animate-pulse'
            }`}
          ></div>
          <div className="ml-3">
            <p className="text-sm font-medium">KYC Verification</p>
            <p className="text-xs text-gray-500">
              {app.status.admin1 === 'approved' 
                ? 'Approved' 
                : app.status.admin1 === 'rejected'
                ? 'Rejected'
                : 'Pending'}
            </p>
          </div>
        </div>
        
        <div className="w-0.5 h-4 bg-gray-300 ml-2.5"></div>
        
        <div className="flex items-center">
          <div 
            className={`w-5 h-5 rounded-full ${
              app.status.admin2 === 'approved' 
                ? 'bg-green-500' 
                : app.status.admin2 === 'rejected'
                ? 'bg-red-500'
                : app.status.admin1 === 'approved' 
                ? 'bg-yellow-400 animate-pulse' 
                : 'bg-gray-300'
            }`}
          ></div>
          <div className="ml-3">
            <p className="text-sm font-medium">Employee Review</p>
            <p className="text-xs text-gray-500">
              {app.status.admin2 === 'approved' 
                ? 'Approved' 
                : app.status.admin2 === 'rejected'
                ? 'Rejected'
                : 'Pending'}
            </p>
          </div>
        </div>
        
        <div className="w-0.5 h-4 bg-gray-300 ml-2.5"></div>
        
        <div className="flex items-center">
          <div 
            className={`w-5 h-5 rounded-full ${
              app.status.admin3 === 'approved' 
                ? 'bg-green-500 animate-ping' 
                : app.status.admin3 === 'rejected'
                ? 'bg-red-500'
                : app.status.admin2 === 'approved' 
                ? 'bg-yellow-400 animate-pulse' 
                : 'bg-gray-300'
            }`}
          ></div>
          <div className="ml-3">
            <p className="text-sm font-medium">Manager Approval</p>
            <p className="text-xs text-gray-500">
              {app.status.admin3 === 'approved' 
                ? 'Approved' 
                : app.status.admin3 === 'rejected'
                ? 'Rejected'
                : 'Pending'}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="w-full h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="bg-finance-navy text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-finance-gold flex items-center justify-center text-finance-navy font-bold mr-3">
            A
          </div>
          <CardTitle>Financial Assistant</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-finance-blue text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-gray-200' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg py-3 px-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        {step === 'menu' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 space-y-2">
              {flowSteps.menu.options?.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start hover:bg-finance-navy hover:text-white"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {step === 'track' && applications.length > 0 && (
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => handleApplicationSelect(app)}
                className="cursor-pointer"
              >
                <ApplicationItem application={app} showStatus={false} />
              </div>
            ))}
          </div>
        )}

        {selectedApplication && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Application Status Details</h3>
            {renderApplicationStatus(selectedApplication)}
          </div>
        )}
      </CardContent>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            type="submit"
            className="bg-finance-navy hover:bg-finance-blue"
            onClick={handleSendMessage}
          >
            <SendIcon size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
