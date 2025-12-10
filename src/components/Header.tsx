import { Link } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-sky-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <FiTrendingUp className="w-8 h-8 text-sky-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {t('header.title')}
              </h1>
              <p className="text-xs text-slate-600">
                {t('header.subtitle')}
              </p>
            </div>
          </Link>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
