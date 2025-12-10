import { Link } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-4 border-politico-red">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-politico-red p-2 rounded">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-politico-darkGray tracking-tight">
                {t('header.title')}
              </h1>
              <p className="text-xs text-gray-600 uppercase tracking-wide">
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
