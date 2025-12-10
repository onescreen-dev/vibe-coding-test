import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full pl-12 pr-4 py-3 border border-gray-300
                   focus:border-politico-red focus:outline-none focus:ring-1 focus:ring-politico-red transition-all
                   bg-white text-slate-900
                   placeholder-gray-400 shadow-sm"
        />
      </div>
    </form>
  );
}
