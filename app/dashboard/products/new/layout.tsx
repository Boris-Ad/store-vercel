
import { PageTitle } from '../../_components/PageTitle';

const NewProductLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <PageTitle>Новый продукт</PageTitle>
      {children}
    </>
  );
};

export default NewProductLayout;
