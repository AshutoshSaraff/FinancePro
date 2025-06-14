
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import QuickActionButton from '@/components/common/QuickActionButton';

export default function ContactPage() {
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
              <h1 className="text-2xl font-bold text-finance-navy">Contact Us</h1>
              <p className="text-gray-600">Get in touch with our support team</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-finance-navy" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-700">+91 80 1234 5678</p>
                      <p className="text-gray-500 text-sm">Mon-Fri, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-finance-navy" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-700">support@financepro.com</p>
                      <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-finance-navy" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-700">123 Baner</p>
                      <p className="text-gray-700">Pune, 411045</p>
                      <p className="text-gray-500 text-sm">Maharashtra, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" defaultValue={currentUser?.name || ''} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" defaultValue={currentUser?.email || ''} />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <Textarea id="message" placeholder="How can we help you?" rows={5} />
                    </div>
                    
                    <Button className="bg-finance-navy hover:bg-finance-blue">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {!currentUser && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-finance-navy mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg">We're here to help with your financial needs</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-finance-navy text-white mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Call Us</h2>
              <p className="text-gray-700 mb-1">+91 80 1234 5678</p>
              <p className="text-gray-500 text-sm">Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-finance-navy text-white mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Email Us</h2>
              <p className="text-gray-700 mb-1">support@financepro.com</p>
              <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
            </div>
            
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-finance-navy text-white mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold mb-2">Visit Us</h2>
              <p className="text-gray-700 mb-1">123 Baner</p>
              <p className="text-gray-700 mb-1">Pune, 411045</p>
              <p className="text-gray-500 text-sm">Maharashtra, India</p>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-finance-navy">Send Us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="How can we help you?" rows={5} />
                  </div>
                  <Button className="bg-finance-navy hover:bg-finance-blue w-full">
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="bg-finance-navy text-white p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Our Customer Service Promise</h2>
                  <p className="mb-4">
                    At FinancePro, we pride ourselves on providing exceptional customer service. Our team is dedicated to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <p>Responding to all inquiries within 24 hours</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <p>Providing personalized financial solutions</p>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-finance-gold rounded-full p-1 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      </div>
                      <p>Offering clear and transparent communication</p>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-finance-gold font-bold">Need immediate assistance?</p>
                  <p className="text-sm">Call our toll-free number: 1800-123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {currentUser && <QuickActionButton />}
    </div>
  );
}
