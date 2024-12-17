'use client';

import React, { useActionState } from 'react';
import { motion, useCycle } from 'motion/react';
import Image from 'next/image';
import { Store } from '@prisma/client';
import { updateStoreDataAction } from '@/server/actions/dashboard-actions/updateStoreData.action';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CgSpinner } from 'react-icons/cg';


export const SidebarShopInfo = ({ store }: { store: Store | null }) => {
  const [position, togglePosition] = useCycle<'close' | 'open'>('close', 'open');
  const [state, formAction, isPending] = useActionState(updateStoreDataAction, undefined);

  React.useEffect(() => {
    if (state?.success) {
      togglePosition();
    }
  }, [state]);

  return (
    <motion.div
      animate={{ width: position === 'close' ? 244 : 600 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
      className="p-2 absolute start-2 w-[244px] bottom-2 border rounded-md text-white flex gap-4 bg-background"
    >
      <div className="min-w-[226px] font-light space-y-6 flex flex-col">
        <div>
          <p>Название</p>
          <h3 className="text-xl">{store ? store.name : 'Not found'}</h3>
        </div>
        <div>
          <p>Логотип</p>
          {store ? <Image src={store.logo}  alt="Logo" width={60} height={60} className='w-[60px] h-auto aspect-square' /> : 'Not found'}
        </div>
        <div className="space-y-2">
          <p>Баннер</p>
          {store ? <Image src={store.banner} alt="Logo" width={226} height={240} className="max-w-[226px] h-auto aspect-video" /> : 'Not found'}
        </div>

        <Button onClick={() => togglePosition()} variant="outline" className="text-black">
          {position === 'close' ? 'Изменить' : 'Отмена'}
        </Button>
      </div>
      <AnimatePresence>
        {position === 'open' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full min-h-full p-2 border rounded-md"
          >
            <form action={formAction} className="space-y-3">
              <div>
                <Label htmlFor="name">Название</Label>
                <Input type="text" id="name" name="name" max={60} required defaultValue={store?.name} className="border-slate-600" />
                {state?.name && <p className='text-destructive text-sm'>{state.name}</p>}
                
              </div>
              <div>
                <Label htmlFor="logo">Логотип</Label>
                <Input type="file" id="logo" name="logo" className="border-slate-600" />
              </div>
              <div>
                <Label htmlFor="banner">Баннер</Label>
                <Input type="file" id="banner" name="banner" className="border-slate-600" />
              </div>
              <Button disabled={isPending} className="w-full">
                {isPending ? <CgSpinner style={{ width: 24, height: 24 }} className="animate-spin" /> : '  Сохранить'}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
