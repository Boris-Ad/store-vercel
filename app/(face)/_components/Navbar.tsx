import { auth } from '@/server/auth';
import { PersonButton } from './PersonButton';

export const Navbar = async () => {
  const session = await auth();

  return (
    <div className="px-6 flex justify-between items-center shadow-md">
      <h2 className="">Name Shop</h2>
      <div className="flex items-center gap-x-4">
        <PersonButton session={session} />
      </div>
    </div>
  );
};
