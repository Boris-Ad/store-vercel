'use client';

import React from 'react';
import { useActionState } from 'react';
import Image from 'next/image';
import { Store } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuImagePlus } from 'react-icons/lu';
import { createStoreDataAction } from '@/server/actions/dashboard-actions/createStoreData.action';
import { updateStoreDataAction } from '@/server/actions/dashboard-actions/updateStoreData.action';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const SettingsForm = ({ store }: { store: Store | null }) => {
  const { toast } = useToast();
  const [logoUrl, setLogoUrl] = React.useState<string | null | undefined>(store?.logo);
  const [bannerUrl, setBannerUrl] = React.useState<string | null | undefined>(store?.banner);
  const [state, formAction, isPending] = useActionState(store ? updateStoreDataAction : createStoreDataAction, {});

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (!file) return;
    const imgUrl = URL.createObjectURL(file);

    switch (e.target.name) {
      case 'logo':
        setLogoUrl(imgUrl);
        break;
      case 'banner':
        setBannerUrl(imgUrl);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (state.success) {
      toast({
        title: state.success,
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex gap-x-6">
        <div className="basis-1/2 space-y-8">
          <div className="relative">
            <Label htmlFor="name" className="text-base">
              Название магазина
            </Label>
            <Input id="name" name="name" type="text" defaultValue={store?.name} className={cn({ 'border-destructive': !!state.name })} />
            {state.name && <p className="absolute text-destructive-foreground">{state.name}</p>}
          </div>
          <div className="relative">
            <p>Логотип</p>
            <Label htmlFor="logo" className="h-24 w-24 text-base grid place-content-center bg-slate-300 aspect-video relative cursor-pointer">
              <Input type="file" id="logo" name="logo" accept="image/*" onChange={setImage} className="hidden" />
              {logoUrl ? (
                <Image src={logoUrl} alt="Banner" fill sizes="100px" className="object-contain" />
              ) : (
                <LuImagePlus size={40} className="text-slate-200" />
              )}
            </Label>
            <p className="text-slate-600">Для замены, клик по картинке.</p>
            {state.logo && <p className="absolute text-destructive-foreground">{state.logo}</p>}
          </div>
        </div>
        <div className="basis-1/2 relative">
          <p>Баннер</p>
          <Label htmlFor="banner" className="text-base grid place-content-center bg-slate-300 aspect-video relative cursor-pointer">
            <Input type="file" id="banner" name="banner" accept="image/*" onChange={setImage} className="hidden" />
            {bannerUrl ? (
              <Image src={bannerUrl} alt="Banner" fill sizes="50vw" className="object-cover" />
            ) : (
              <LuImagePlus size={120} className="text-slate-200" />
            )}
          </Label>
          <p className="text-slate-600">Для замены, клик по картинке.</p>
          {state.banner && <p className="absolute text-destructive-foreground">{state.banner}</p>}
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        Сохранить
      </Button>
    </form>
  );
};
