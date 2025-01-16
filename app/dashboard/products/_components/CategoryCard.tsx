'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Category } from '@prisma/client';
import { Loader, SlidersHorizontal, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { deleteCategoryAction } from '@/server/actions/dashboard-actions/categories.actions';
import { cn } from '@/lib/utils';
import { CreateUpdateCategoryDialog } from './CreateUpdateCategoryDialog';

export const CategoryCard = ({
  category,
  selectedCategory,
  setSelectedCategory,
}: {
  category: Category;
  selectedCategory?: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
}) => {
  const [isVisibleAlert, setIsVisibleAlert] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const deleteCategoryAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisibleAlert(true);
  };

  const deleteCategory = () => {
    startTransition(async () => {
      await deleteCategoryAction(category.id);
    });
  };

  return (
    <>
      {isPending ? (
        <div className="h-full aspect-[3/2] grid place-content-center shadow-md rounded bg-slate-300">
          <Loader size={32} className="animate-spin text-white" />
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 1 }}
          onClick={() => {
            setSelectedCategory(category);
          }}
          className={cn('h-full aspect-[3/2] relative grid place-content-center shadow-md rounded overflow-hidden cursor-pointer group', {
            'ring-4 ring-orange-500': selectedCategory?.id === category.id,
          })}
        >
          <Image src={category.imageUrl} alt={category.name} fill sizes="200px" className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <h2 className="text-white z-10">{category.name}</h2>
          <div onClick={e => e.stopPropagation()}>
            <CreateUpdateCategoryDialog category={category}>
              <button
                onPointerDownCapture={e => e.stopPropagation()}
                className="w-8 h-8 bg-black/40 absolute top-1 end-1 grid place-content-center rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
              >
                <SlidersHorizontal size={18} className="text-white" />
              </button>
            </CreateUpdateCategoryDialog>
          </div>

          <button
            onClick={deleteCategoryAlert}
            onPointerDownCapture={e => e.stopPropagation()}
            className="w-8 h-8 bg-black/40 absolute bottom-1 end-1 grid place-content-center rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
          >
            <Trash2 size={18} className="text-destructive" />
          </button>
        </motion.div>
      )}

      <AlertDialog open={isVisibleAlert} onOpenChange={setIsVisibleAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить категорию {category.name} ?</AlertDialogTitle>
            <AlertDialogDescription>Удалив категорию, удалятся все продукты этой категории!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCategory}>Продолжить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
