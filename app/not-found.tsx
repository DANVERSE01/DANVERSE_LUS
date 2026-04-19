import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-void text-titanium p-4">
      <h2 className="font-sans text-4xl mb-4">[ 404 // DATA NOT FOUND ]</h2>
      <p className="font-mono text-sm opacity-50 mb-8 max-w-md text-center">
        The requested neural path could not be resolved. The sector may have been purged or is currently restricted.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 border border-titanium/20 hover:border-danverse hover:text-danverse transition-all font-mono text-xs tracking-widest"
      >
        [ RETURN TO CORE ]
      </Link>
    </div>
  );
}
