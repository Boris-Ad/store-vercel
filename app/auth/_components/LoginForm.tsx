'use client';

import { loginAction } from '@/server/actions/auth.actions';
import { useActionState } from 'react';

export const LoginForm = () => {
    const [state, formAction, isPending] = useActionState(loginAction,undefined)
  return (
    <form action={formAction} className="space-y-5 text-foreground">
      <input type="email" name="email" placeholder="Email" className="auth-input" required />
      <input type="password" name="password" placeholder="Пароль" className="auth-input" required />
      {state && <p className='text-destructive-foreground'>{state}</p>}
      
      <div className="py-2">
        <button type="submit" disabled={isPending} className="w-full p-2 bg-muted/80 hover:bg-muted rounded-full transition-colors disabled:bg-muted/40">
          Войти
        </button>
      </div>
    </form>
  );
};
