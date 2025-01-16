'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Category } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { CategoryCard } from './CategoryCard';
import { CreateUpdateCategoryDialog } from './CreateUpdateCategoryDialog';

export const CategoriesSection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: Category[];
  selectedCategory?: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
}) => {
  return (
    <section className="h-[160px] p-2 flex gap-x-3 border rounded">
      <CreateUpdateCategoryDialog>
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 1 }} className="h-full border rounded aspect-[3/2] text-slate-600 shadow-md">
          Создать категорию
        </motion.button>
      </CreateUpdateCategoryDialog>
      <Separator orientation="vertical" className="bg-slate-400" />
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      ))}
    </section>
  );
};
