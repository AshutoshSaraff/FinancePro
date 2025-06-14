
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function AboutPage() {
  const { currentUser } = useData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {currentUser && (
        <div className="flex relative">
          <Sidebar type={currentUser.role === 'user' ? 'user' : 'admin'} />
          <div className="flex-1 p-6 md:ml-64 w-full">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-finance-navy">About Us</h1>
              <p className="text-gray-600">Learn more about FinancePro</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Our Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Founded in 2025, FinancePro has been at the forefront of financial innovation in India. 
                    We started with a simple vision: to make financial services accessible, transparent, and 
                    hassle-free for every Indian citizen.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Over the years, we've grown from a small startup to one of India's most trusted financial 
                    institutions, serving millions of customers across the country. Our team of dedicated 
                    professionals works tirelessly to provide the best financial solutions tailored to your needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    At FinancePro, our mission is to empower every Indian with the financial tools and knowledge 
                    they need to achieve their dreams. We believe that financial freedom is a fundamental right, 
                    and we're committed to making it a reality for all.
                  </p>
                  <p className="text-gray-700">
                    Through innovative technology, personalized service, and unwavering integrity, we aim to 
                    transform the financial landscape of India and contribute to the nation's economic growth.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Integrity</h3>
                        <p className="text-gray-700">We uphold the highest standards of honesty and ethical conduct in all our dealings.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Customer First</h3>
                        <p className="text-gray-700">Our customers' needs are at the center of everything we do.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Innovation</h3>
                        <p className="text-gray-700">We continuously strive to improve and innovate our services to meet evolving financial needs.</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {!currentUser && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-finance-navy mb-4">About Us</h1>
            <p className="text-gray-600 text-lg">Learn more about FinancePro</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-finance-navy">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2010, FinancePro has been at the forefront of financial innovation in India. 
                We started with a simple vision: to make financial services accessible, transparent, and 
                hassle-free for every Indian citizen.
              </p>
              <p className="text-gray-700">
                Over the years, we've grown from a small startup to one of India's most trusted financial 
                institutions, serving millions of customers across the country. Our team of dedicated 
                professionals works tirelessly to provide the best financial solutions tailored to your needs.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-finance-navy">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At FinancePro, our mission is to empower every Indian with the financial tools and knowledge 
                they need to achieve their dreams. We believe that financial freedom is a fundamental right, 
                and we're committed to making it a reality for all.
              </p>
              <p className="text-gray-700">
                Through innovative technology, personalized service, and unwavering integrity, we aim to 
                transform the financial landscape of India and contribute to the nation's economic growth.
              </p>
            </div>
          </div>
          
          <div className="bg-finance-navy text-white rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-finance-navy/50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Integrity</h3>
                <p>We uphold the highest standards of honesty and ethical conduct in all our dealings.</p>
              </div>
              <div className="bg-finance-navy/50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Customer First</h3>
                <p>Our customers' needs are at the center of everything we do.</p>
              </div>
              <div className="bg-finance-navy/50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Innovation</h3>
                <p>We continuously strive to improve and innovate our services to meet evolving financial needs.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4 text-finance-navy">Join Our Journey</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Whether you're looking for a personal loan, business financing, or investment opportunities,
              FinancePro is here to help you achieve your financial goals. Join thousands of satisfied 
              customers who have trusted us with their financial needs.
            </p>
          </div>
        </div>
      )}
      
      {currentUser && <QuickActionButton />}
    </div>
  );
}
