import Link from 'next/link';

const HomePage = () => {
  return (
    <main className='container'>
      <h2>Home Page</h2>

      <Link href="/auth/login">Auth</Link>
    </main>
  );
};

export default HomePage;
