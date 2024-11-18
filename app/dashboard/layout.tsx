
import { Navbar } from "./_components/Navbar"
import { Sidebar } from "./_components/Sidebar"
import { Toaster } from "@/components/ui/toaster"

const DashboardLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
   
    return (
        <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[70px_1fr]  bg-slate-50 text-black">
            <Sidebar />
            <Navbar />
            <main className="p-6 overflow-auto">{children}</main>
            <Toaster />
        </div>
    )
}

export default DashboardLayout