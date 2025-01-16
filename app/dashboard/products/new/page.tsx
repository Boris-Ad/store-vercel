import { getCategories } from '@/server/db/categories';
import { NewProduct } from './_components/NewProduct';

const NewProductPage = async () => {
  const categories = await getCategories();

  return (
    <>
      <NewProduct categories={categories} />
    </>
  );
};

export default NewProductPage;


