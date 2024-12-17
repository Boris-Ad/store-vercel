'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarNavLinks } from '@/data/dashboard';

export const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className="p-2 flex-1">
      <ul className="text-lg text-slate-300">
        {sidebarNavLinks.map(page => (
          <li key={page.title}>
            <Link
              href={page.href}
              className={cn(
                'w-full p-2 block hover:bg-slate-600 rounded-md transition-colors',
                {
                  'text-secondary-foreground': pathname === page.href,
                },
                pathname === page.href ? 'hover:text-secondary-foreground' : 'hover:text-white'
              )}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
