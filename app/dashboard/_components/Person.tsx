'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoPersonOutline, IoStorefront } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export const Person = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={session?.user?.image || undefined} />
          <AvatarFallback className="text-xl font-medium">{session?.user?.name ? session.user.name[0].toUpperCase() : <IoPersonOutline />}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3">
        {session && <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <FiLogOut />
          Выход
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">
            <IoStorefront /> Магазин
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
