'use client';

import React, { useActionState } from 'react';
import Form from 'next/form';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { createCategoryAction, updateCategoryAction } from '@/server/actions/dashboard-actions/categories.actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ImagePlus } from 'lucide-react';
import { Category } from '@prisma/client';

export const CreateUpdateCategoryDialog = ({ children, category }: { children: React.ReactNode; category?: Category }) => {
  const [state, formAction, isPending] = useActionState(category ? updateCategoryAction.bind(null,category.id) : createCategoryAction, {});
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(category?.imageUrl);
  const [name, setName] = React.useState(category?.name || '');
  const [isVisibleDialog, setIsVisibleDialog] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: string[]; image?: string[] }>({});
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;
    const imgPath = URL.createObjectURL(e.target.files[0]);
    setImageUrl(imgPath);
  };

  React.useEffect(() => {
    setErrors({ name: state.name, image: state.image });
    if (state.success) {
      setIsVisibleDialog(false);
    }
  }, [state]);

  React.useEffect(() => {
    if (formRef.current == null) return;
    if (isVisibleDialog === true) {
      formRef.current.reset();
      setImageUrl(undefined);
      setName('');
      setErrors({});
    }
  }, [isVisibleDialog]);

  return (
    <Dialog open={isVisibleDialog} onOpenChange={setIsVisibleDialog}>

      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">{category ? 'Обновление данных' : 'Новая категория'}</DialogTitle>
        </DialogHeader>
        <Form ref={formRef} action={formAction} className="space-y-5">
          <div className="relative">
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              name="name"
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              onFocus={() => setErrors(prev => ({ ...prev, name: undefined }))}
              className={cn({ 'border-destructive': errors.name })}
            />

            {errors.name && <p className="text-sm text-destructive-foreground absolute start-1 bottom-0 translate-y-full">{errors.name}</p>}
          </div>
          <div className="relative">
            <p className="text-sm">Изображение</p>
            <Label htmlFor="image" className="border border-slate-300  aspect-[3/2] grid place-content-center cursor-pointer relative">
              <ImagePlus size={62} className="text-slate-300" />
              {imageUrl && <Image src={imageUrl} alt="Image" fill sizes="500px" className="object-cover" />}
            </Label>
            {errors.image && <p className="text-destructive-foreground absolute start-1 bottom-0 -z-10">{errors.image}</p>}

            <Input id="image" type="file" name="image" onChange={handleChange} className="hidden" />
          </div>
          <div className="flex items-center gap-3">
            <Button disabled={isPending}>{category ? 'Обновить' : 'Создать'}</Button>
            <Button type="button" onClick={() => setIsVisibleDialog(false)} variant="outline">
              Отмена
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
