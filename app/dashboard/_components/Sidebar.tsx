import { getStore } from '@/server/db/store';
import { SidebarNav } from './SidebarNav';
import { SidebarShopInfo } from './SidebarShopInfo';

export const Sidebar = async () => {
  const store = await getStore()
  return (
    <section className="p-2 pt-[70px] row-span-full bg-background flex flex-col gap-y-8 relative">
      <SidebarNav />
      <SidebarShopInfo store={store} />
    </section>
  );
};
