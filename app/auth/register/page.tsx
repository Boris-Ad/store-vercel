import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { signIn } from '@/server/auth';
import { RegisterForm } from '../_components/RegisterForm';

const RegisterPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { callbackUrl } = await searchParams;
  if (!callbackUrl) return signIn();
  const callbackUrlParams = new URLSearchParams();
  callbackUrlParams.set('callbackUrl', callbackUrl);

  return (
    <div className="w-[460px] px-4 py-6 bg-background border border-gray-700 rounded-md relative text-center">
      <Link href={callbackUrl} className="absolute top-4 end-4">
        <IoClose size={28} className="text-muted-foreground/80 hover:text-muted-foreground" />
      </Link>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl text-secondary-foreground font-medium">Регистрация</h2>
        <p className="text-muted-foreground">Создать аккаунт</p>
      </div>
      <RegisterForm callbackUrl={callbackUrl} />

      <Link className="mt-3 mx-auto inline-block text-sm text-muted-foreground hover:underline" href={'/auth/login?' + callbackUrlParams}>
        Есть аккаунт? Войти
      </Link>
    </div>
  );
};

export default RegisterPage;
