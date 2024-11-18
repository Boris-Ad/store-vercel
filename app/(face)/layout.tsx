import { Navbar } from "./_components/Navbar";

const FaceLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen grid grid-rows-[70px_1fr] bg-background text-foreground">
      <Navbar />
      {children}
    </div>
  );
};

export default FaceLayout;
