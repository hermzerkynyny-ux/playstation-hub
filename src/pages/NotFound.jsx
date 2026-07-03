function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">404</div>
      <h1 className="text-2xl font-bold text-slate-100 mb-2">Page Not Found</h1>
      <p className="text-slate-400 mb-6">The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-orange-500 text-slate-950 rounded-lg font-semibold hover:bg-orange-600 transition"
      >
        Go to Dashboard
      </a>
    </div>
  );
}

export default NotFound;
