
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h1 className="text-8xl font-bold text-finance-navy mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Page not found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="bg-finance-navy hover:bg-finance-blue">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
