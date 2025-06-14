
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

export default function LandingPage() {
  const features = [
    {
      title: 'For Users',
      description: 'Easy application process with real-time tracking',
      icon: '👤',
    },
    {
      title: 'Quick Approval',
      description: 'Get approved in as little as 24 hours',
      icon: '⏱️',
    },
    {
      title: 'Low Interest',
      description: 'Competitive rates tailored to your needs',
      icon: '💰',
    },
    {
      title: 'Secure Platform',
      description: 'Your data is protected with advanced encryption',
      icon: '🔒',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-finance-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Fast, Flexible Financing Solutions
            </h1>
            <p className="text-xl mb-10 text-gray-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Get the funds you need with a streamlined approval process and competitive rates
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link to="/login">
                <Button size="lg" className="bg-finance-gold text-finance-navy hover:bg-yellow-400">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-finance-navy border-none hover:bg-white-400">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-finance-navy">
            Why Choose FinancePro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-finance-lightgrey rounded-lg p-6 text-center hover-grow card-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-finance-navy">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-finance-navy">
                Streamlined Loan Processing
              </h2>
              <p className="text-gray-600 mb-4">
                Our multi-stage approval process ensures quick, thorough evaluation of your application.
                With our transparent tracking system, you always know exactly where your application stands.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you need a personal loan, home mortgage, or business financing,
                our dedicated team works to get you the best rates and terms.
              </p>
              <Link to="/login">
                <Button className="bg-finance-navy hover:bg-finance-blue">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
                alt="Loan Processing"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials or offers */}
      <section className="py-16 bg-finance-navy text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg hover-grow">
              <h3 className="text-xl font-semibold mb-4">Personal Loans</h3>
              <p className="text-gray-300 mb-4">
                Rates starting at 9.99% APR with flexible repayment options.
              </p>
              <Link to="/loan-application">
                <Button variant="outline" className="bg-finance-gold text-finance-navy border-none hover:bg-yellow-400">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 p-6 rounded-lg hover-grow">
              <h3 className="text-xl font-semibold mb-4">Home Loans</h3>
              <p className="text-gray-300 mb-4">
                Fixed rate mortgages from 6.5% with up to 30-year terms.
              </p>
              <Link to="/loan-application">
                <Button variant="outline" className="bg-finance-gold text-finance-navy border-none hover:bg-yellow-400">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 p-6 rounded-lg hover-grow">
              <h3 className="text-xl font-semibold mb-4">Business Financing</h3>
              <p className="text-gray-300 mb-4">
                Flexible business loans to help your company grow and expand.
              </p>
              <Link to="/loan-application">
                <Button variant="outline" className="bg-finance-gold text-finance-navy border-none hover:bg-yellow-400">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-finance-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">FinancePro</h3>
              <p className="text-sm text-gray-300">
                Your trusted partner for all financial solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/products" className="hover:text-white">Personal Loans</Link></li>
                <li><Link to="/products" className="hover:text-white">Home Loans</Link></li>
                <li><Link to="/products" className="hover:text-white">Car Loans</Link></li>
                <li><Link to="/products" className="hover:text-white">Business Loans</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/about" className="hover:text-white">Careers</Link></li>
                <li><Link to="/about" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <address className="not-italic text-sm text-gray-300">
                <p>123 Baner</p>
                <p>Pune, MH 411045  </p>
                <p className="mt-2">contact@financepro.com</p>
                <p>+91-987-654-3210</p>
              </address>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>© {new Date().getFullYear()} FinancePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
