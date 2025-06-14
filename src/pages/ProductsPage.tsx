
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card } from '@/components/ui/card';
import { Banknote } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function ProductsPage() {
  const { currentUser } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser) return null;
  
  const products = [
    { name: 'Fixed Deposits', color: 'from-blue-400 to-indigo-600' },
    { name: 'RD', color: 'from-purple-400 to-pink-600' },
    { name: 'Debit Cards', color: 'from-green-400 to-teal-600' },
    { name: 'Credit Cards', color: 'from-red-400 to-yellow-600' },
    { name: 'Loans', color: 'from-yellow-400 to-orange-600' },
    { name: 'Insurance', color: 'from-pink-400 to-rose-600' },
    { name: 'Mutual Funds', color: 'from-indigo-400 to-blue-600' },
    { name: 'PPF', color: 'from-teal-400 to-cyan-600' },
    { name: 'NPS', color: 'from-orange-400 to-red-600' }
  ];
  
  const handleProductClick = (productName: string) => {
    toast({
      title: "Coming Soon",
      description: `${productName} will be available soon.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <Sidebar type={currentUser.role === 'user' ? 'user' : 'admin'} />
        <div className="flex-1 p-6 md:ml-64 w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-finance-navy">Our Products</h1>
            <p className="text-gray-600">Explore our range of financial products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${product.color} text-white`}
                onClick={() => handleProductClick(product.name)}
              >
                <div className="flex items-center">
                  <div className="mr-4 p-3 bg-white/10 rounded-full">
                    <Banknote className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
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
