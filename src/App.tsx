
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { DataProvider } from '@/context/DataContext';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import UserDashboard from '@/pages/UserDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import LoanApplicationPage from '@/pages/LoanApplicationPage';
import MyApplicationsPage from '@/pages/MyApplicationsPage';
import AgentChatPage from '@/pages/AgentChatPage';
import AdminApplicationsPage from '@/pages/AdminApplicationsPage';
import UserProfilePage from '@/pages/UserProfilePage';
import UserInformationPage from '@/pages/UserInformationPage';
import ProductsPage from '@/pages/ProductsPage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';
import FinanceProPage from '@/pages/FinanceProPage';

// Define routes
const router = createHashRouter([

  {
    path: '/',
    element: <LandingPage />,
  },

  {
  path: '/financepro',
  element: <FinanceProPage />,
  },

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <UserDashboard />,
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/loan-application',
    element: <LoanApplicationPage />,
  },
  {
    path: '/my-applications',
    element: <MyApplicationsPage />,
  },
  {
    path: '/agent-chat',
    element: <AgentChatPage />,
  },
  {
    path: '/admin-applications',
    element: <AdminApplicationsPage />,
  },
  {
    path: '/user-profile',
    element: <UserProfilePage />,
  },
  {
    path: '/user-information',
    element: <UserInformationPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </DataProvider>
  );
}

export default App;
