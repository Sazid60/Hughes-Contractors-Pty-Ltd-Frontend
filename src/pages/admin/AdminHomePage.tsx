export default function AdminHomePage() {
    return (
        <>
            <section className="text-center flex flex-col items-center justify-center gap-4">
                {/* Logo */}
                <img
                    src="/logo.webp"
                    alt="Logo"
                    className="h-64 w-64 object-cover"
                />

                {/* Heading & Subtext */}
                <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
                <p className="text-gray-600">Choose a section from the sidebar to manage your data.</p>
            </section>
        </>
    );
}
