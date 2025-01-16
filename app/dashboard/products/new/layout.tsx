import { Suspense } from "react"
import { PageTitle } from "../../_components/PageTitle"

const NewProductLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
        <PageTitle>Новый продукт</PageTitle>
        <Suspense fallback={<p>Load...</p>}>
            {children}
        </Suspense>
        </>
    )
}

export default NewProductLayout