
import prisma from '@/server/prisma';
import { SettingsForm } from './_components/SettingsForm';

const SettingsPage = async () => {
  const store = await prisma.store.findUnique({where:{id:1}})
  return (
    <>
      <h2 className="mt-4 mb-8 text-3xl font-medium">Настройка</h2>
      <SettingsForm store={store} />
    </>
  );
};

export default SettingsPage;
