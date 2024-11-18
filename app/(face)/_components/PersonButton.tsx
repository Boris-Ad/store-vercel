'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { IoPersonOutline } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FiLogIn } from 'react-icons/fi';
import { HoverMenu } from './HoverMenu';


export const PersonButton = ({ session }: { session: Session | null }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="h-9 w-9 border rounded-full grid place-items-center relative cursor-pointer"
    >
      {session?.user?.image ? (
        <Image src={session.user.image} alt="userName" fill sizes="32px 32px" className="object-contain rounded-full" />
      ) : session?.user?.name ? (
        session.user.name[0].toUpperCase()
      ) : (
        <IoPersonOutline size={24} className="text-slate-300" />
      )}

      <HoverMenu isVisible={isVisible}>
        {session?.user ? (
          <button onClick={() => signOut()} className="w-full px-1 py-1.5 flex items-center gap-x-2 hover:bg-muted rounded-md transition-colors">
            <FiLogIn />
            Выйти
          </button>
        ) : (
          <button onClick={() => signIn()} className="w-full px-1 py-1.5 flex items-center gap-x-2 hover:bg-muted rounded-md transition-colors">
            <FiLogIn />
            Войти
          </button>
        )}
        {session?.user?.role === 'ADMIN' && (
          <Link href="/dashboard" className="w-full px-1 py-1.5 flex items-center gap-x-2 hover:bg-muted rounded-md transition-colors">
            <MdAdminPanelSettings />
            Админка
          </Link>
        )}
      </HoverMenu>
    </div>
  );
};
