import { Link } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <FiTrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Global Trends
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Track Economic, Political & Social Developments Worldwide
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
