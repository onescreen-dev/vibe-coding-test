import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for trends, topics, and keywords..."
          className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-slate-300 dark:border-slate-600
                   focus:border-primary-500 focus:outline-none transition-colors
                   bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                   placeholder-slate-400 dark:placeholder-slate-500"
        />
      </div>
    </form>
  );
}
