import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Practice',
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#273344] to-gray-800 to-70% grid place-content-center">
      {children}
    </main>
  );
};

export default AuthLayout;
