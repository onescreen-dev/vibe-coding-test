import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300
                   hover:border-politico-red transition-all duration-200 shadow-sm"
        aria-label="Select language"
      >
        <FiGlobe className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-800">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border border-gray-300
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-3 text-left hover:bg-red-50 transition-colors
                       flex items-center gap-3 border-b border-gray-200 last:border-b-0 ${i18n.language === lang.code ? 'bg-red-100' : ''}`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className={`text-sm font-medium ${i18n.language === lang.code ? 'text-politico-red' : 'text-gray-800'}`}>
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
