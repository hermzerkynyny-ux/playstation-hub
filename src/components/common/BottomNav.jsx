import { Link, useLocation } from 'react-router-dom';
import { Home, History, Settings } from 'lucide-react';

function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700">
      <div className="max-w-md mx-auto flex justify-around">
        <Link
          to="/"
          className={`flex-1 flex items-center justify-center py-3 transition ${
            isActive('/') ? 'text-orange-500 border-t-2 border-orange-500' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Home size={24} />
        </Link>
        <Link
          to="/history"
          className={`flex-1 flex items-center justify-center py-3 transition ${
            isActive('/history') ? 'text-orange-500 border-t-2 border-orange-500' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <History size={24} />
        </Link>
        <Link
          to="/settings"
          className={`flex-1 flex items-center justify-center py-3 transition ${
            isActive('/settings') ? 'text-orange-500 border-t-2 border-orange-500' : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Settings size={24} />
        </Link>
      </div>
    </nav>
  );
}

export default BottomNav;
