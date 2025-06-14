
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ServiceItem {
  icon: string;
  label: string;
  path: string;
}

export default function ServiceIcons() {
  const navigate = useNavigate();
  
  const services: ServiceItem[] = [
    { icon: '💸', label: 'Transfers', path: '/transfers' },
    { icon: '💳', label: 'Cards', path: '/cards' },
    { icon: '📝', label: 'Bills', path: '/bills' },
    { icon: '💰', label: 'Payments', path: '/payments' },
    { icon: '🏧', label: 'ATMs', path: '/atms' },
    { icon: '📱', label: 'Scan QR', path: '/scan-qr' },
    { icon: '📊', label: 'Reports', path: '/reports' },
    { icon: '🛠️', label: 'Support', path: '/support' },
  ];
  
  return (
    <Card className="p-4 hover-grow card-shadow">
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {services.map((service) => (
          <div
            key={service.label}
            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate(service.path)}
          >
            <div className="w-12 h-12 rounded-full bg-finance-lightgrey flex items-center justify-center text-2xl mb-1">
              {service.icon}
            </div>
            <span className="text-xs text-center">{service.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
