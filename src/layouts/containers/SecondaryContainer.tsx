import type { ReactNode } from "react";

interface MainContainerProps {
    children: ReactNode;
}

export default function SecondaryContainer({ children }: MainContainerProps) {
    return (
        <main className="w-full px-4 mt-28 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-screen-2xl mx-auto">
            {children}
        </main>
    )
}
