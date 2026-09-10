export default function ShowLoading() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-5xl animate-pulse">
        <div className="h-5 w-32 bg-slate-800 rounded mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="aspect-2/3 w-full rounded-xl bg-slate-800" />
            <div className="md:col-span-2 space-y-4">
            <div className="h-10 w-3/4 bg-slate-800 rounded" />
            <div className="h-6 w-1/2 bg-slate-800 rounded" />
            <div className="flex gap-2">
                <div className="h-6 w-16 bg-slate-800 rounded-md" />
                <div className="h-6 w-16 bg-slate-800 rounded-md" />
            </div>
            <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-slate-800 rounded" />
                <div className="h-4 w-full bg-slate-800 rounded" />
                <div className="h-4 w-2/3 bg-slate-800 rounded" />
            </div>
            </div>
        </div>

        <div className="space-y-4 border-t border-slate-800 pt-8">
            <div className="h-8 w-40 bg-slate-800 rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-slate-900 border border-slate-800 rounded-lg p-4" />
            ))}
            </div>
        </div>
        </main>
    );
}