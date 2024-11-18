'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { registerAction } from '@/server/actions/auth.actions';
import { useActionState } from 'react';

export const RegisterForm = ({ callbackUrl }: { callbackUrl: string }) => {
  const [state, formAction, isPending] = useActionState(registerAction.bind(null, callbackUrl), {});
  const [, setUpdate] = React.useState(true);

  const clearError = (key: keyof typeof state) => {
    delete state[key];
    setUpdate(prev => !prev);
  };

  return (
    <form action={formAction} className="space-y-6 text-foreground">
      <div className="relative">
        <input
          type="text"
          name="name"
          onFocus={() => clearError('name')}
          placeholder="Имя"
          className={cn('auth-input', { 'border-destructive': state.name })}
        />
        {state.name && <p className="absolute left-1 bottom-0 translate-y-full text-destructive-foreground">{state.name}</p>}
      </div>

      <div className="relative">
        <input
          type="email"
          name="email"
          onFocus={() => clearError('email')}
          placeholder="Email"
          className={cn('auth-input', { 'border-destructive': state.email })}
        />
        {state.email && <p className="absolute left-1 bottom-0 translate-y-full text-destructive-foreground">{state.email}</p>}
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          onFocus={() => clearError('password')}
          placeholder="Пароль"
          className={cn('auth-input', { 'border-destructive': state.password })}
        />
        {state.password && <p className="absolute left-1 bottom-0 translate-y-full text-destructive-foreground">{state.password}</p>}
      </div>

      <div className="py-2">
        <button type="submit" disabled={isPending} className="w-full p-2 bg-muted/80 hover:bg-muted rounded-full transition-colors disabled:bg-muted/40">
          Создать
        </button>
      </div>
    </form>
  );
};
