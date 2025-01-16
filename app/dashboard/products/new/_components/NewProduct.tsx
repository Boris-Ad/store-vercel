'use client';

import { Category } from '@prisma/client';
import { CategoriesSection } from '../../_components/CategoriesSection';
import React from 'react';

export const NewProduct = ({ categories }: { categories: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();

  return (
    <div>
      <div className="space-y-3">
        <h2 className="text-xl">Выберите категорию</h2>
        <CategoriesSection categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
      {selectedCategory && (
        <p>{selectedCategory.name}</p>
      )}
    </div>
  );
};
