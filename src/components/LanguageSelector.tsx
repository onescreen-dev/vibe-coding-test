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
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-sky-200
                   hover:border-sky-400 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Select language"
      >
        <FiGlobe className="w-5 h-5 text-sky-600" />
        <span className="text-sm font-medium text-slate-700">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-sky-100
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full px-4 py-3 text-left hover:bg-sky-50 transition-colors first:rounded-t-lg last:rounded-b-lg
                       flex items-center gap-3 ${i18n.language === lang.code ? 'bg-sky-100' : ''}`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className={`text-sm font-medium ${i18n.language === lang.code ? 'text-sky-700' : 'text-slate-700'}`}>
              {lang.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
