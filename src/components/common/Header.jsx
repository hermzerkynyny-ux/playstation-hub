import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Settings } from 'lucide-react';

function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-500">🎮 PlayStation Hub</h1>
        <button className="p-2 hover:bg-slate-700 rounded-lg transition">
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
