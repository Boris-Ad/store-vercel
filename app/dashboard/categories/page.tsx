import { getCategories } from '@/server/db/categories';
import { PageTitle } from '../_components/PageTitle';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <PageTitle>Категории</PageTitle>
      <Button asChild variant="outline">
        <Link href="/dashboard/categories/new">
          <Plus />
          Создать категорию
        </Link>
      </Button>
      <section className='py-6'>
      {categories.length === 0 ? <h3 className="text-2xl">Нет категорий!</h3> : (
        <div>

        </div>
        )}
      </section>

    </>
  );
};

export default CategoriesPage;
