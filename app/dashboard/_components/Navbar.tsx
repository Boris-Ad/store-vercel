import { auth } from "@/server/auth"
import { Person } from "./Person"


export const Navbar = async () => {
    const session = await auth()
    return (
        <div className="px-6 shadow-md bg-white flex justify-between items-center ">
            <h2>Shop Name</h2>
            <Person session={session} />
        </div>
    )
}