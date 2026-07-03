import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import BottomNav from '../components/common/BottomNav';

function MainLayout() {
  return (
    <div className="flex flex-col h-screen bg-slate-950">
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;
