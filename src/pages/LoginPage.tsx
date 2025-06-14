
import AuthForm from '@/components/auth/AuthForm';
import Navbar from '@/components/layout/Navbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="py-12 flex flex-col items-center justify-center bg-gray-50">
        <AuthForm />
      </div>
    </div>
  );
}
