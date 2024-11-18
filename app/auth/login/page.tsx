import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { LoginForm } from '../_components/LoginForm';
import { signIn } from '@/server/auth';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { callbackUrl } = await searchParams;
  if (!callbackUrl) return signIn();
  const callbackUrlParams = new URLSearchParams();
  callbackUrlParams.set('callbackUrl', callbackUrl);

  return (
    <div className="w-[460px] px-4 py-6 bg-background border rounded-md relative text-center">
      <Link href="/" className="absolute top-4 end-4">
        <IoClose size={28} className="text-muted-foreground/80 hover:text-muted-foreground" />
      </Link>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl text-secondary-foreground font-medium">Вход</h2>
        <p className="text-muted-foreground">Войти в свой аккаунт</p>
      </div>
      <LoginForm />
      <div className="h-[1px] mt-5 text-muted-foreground bg-border relative">
        <span className="px-2 bg-background absolute start-1/2 -translate-y-1/2 -translate-x-1/2">или</span>
      </div>
      <LoginButtonGoogle />
      <Link className="mt-3 mx-auto inline-block text-sm text-muted-foreground hover:underline" href={'/auth/register?' + callbackUrlParams }>
        Нет аккаунта? Регистрация
      </Link>
    </div>
  );
};

export default LoginPage;


const LoginButtonGoogle = () => {
  return (
    <form
      className="w-full pt-1"
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit" className="mt-5 p-2 border w-full rounded-full hover:bg-muted/40 transition-colors">
        <FcGoogle size={22} className='mx-auto' />
      </button>
    </form>
  );
};
