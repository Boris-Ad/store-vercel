'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SidebarNav = () => {
  const pathname = usePathname();

  const pages = [
    { href: '/dashboard', title: 'Главная' },
    { href: '/dashboard/settings', title: 'Настройка' },
    { href: '/dashboard/products', title: 'Продукты' },
    { href: '/dashboard/orders', title: 'Заказы' },
  ];

  return (
    <nav className="p-6">
      <ul className="text-lg text-slate-300">
        {pages.map(page => (
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
