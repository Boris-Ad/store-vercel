import { Button } from '@/components/ui/button';
import { PageTitle } from '../_components/PageTitle';
import Link from 'next/link';

const ProductsPage = async () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Продукты</PageTitle>
        <Button asChild variant="outline" size="lg">
          <Link href="/dashboard/products/new">Создать продукт</Link>
        </Button>
      </div>
    </>
  );
};

export default ProductsPage;
