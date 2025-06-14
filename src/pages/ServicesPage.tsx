
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ServicesPage() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  const services = [
    { name: 'Internet Banking', color: 'from-sky-400 to-blue-700' },
    { name: 'Mobile Banking', color: 'from-emerald-400 to-teal-700' },
    { name: 'UPI', color: 'from-violet-400 to-purple-700' },
    { name: 'IMPS', color: 'from-amber-400 to-yellow-700' },
    { name: 'E-wallet', color: 'from-rose-400 to-pink-700' },
    { name: 'Virtual Debit Cards', color: 'from-cyan-400 to-blue-700' }
  ];
  
  const handleServiceClick = (serviceName: string) => {
    toast({
      title: "Coming Soon",
      description: `${serviceName} will be available soon.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type={currentUser.role === 'user' ? 'user' : 'admin'} />
        <div className="flex-1 p-6 md:ml-64 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-finance-navy">Our Services</h1>
            <p className="text-gray-600">Explore our digital banking services</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${service.color} text-white`}
                onClick={() => handleServiceClick(service.name)}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-white/10 rounded-full">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p className="text-sm text-white/80">Click to learn more</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
