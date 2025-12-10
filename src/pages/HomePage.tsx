import { useState, useMemo } from 'react';
import WordCloudComponent from '../components/WordCloudComponent';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import type { FilterState } from '../types';
import { getKeywordsByFilter } from '../data/mockData';

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    continent: 'global',
    region: '',
    category: '',
    search: '',
  });

  const filteredKeywords = useMemo(() => {
    let keywords = getKeywordsByFilter(
      filters.continent,
      filters.region,
      filters.category
    );

    if (filters.search) {
      keywords = keywords.filter(k =>
        k.text.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return keywords;
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters({ ...filters, search: query });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Discover Global Trends
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Explore the most relevant topics shaping our world. Size indicates importance and reach.
            Click any keyword to dive deeper.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} initialValue={filters.search} />

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-primary-600">{filteredKeywords.length}</span> trending topics
            {filters.continent !== 'global' && (
              <span> in <span className="font-semibold">{filters.continent}</span></span>
            )}
          </p>
        </div>

        {/* Word Cloud */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 md:p-12 min-h-[500px] flex items-center justify-center">
          {filteredKeywords.length > 0 ? (
            <WordCloudComponent keywords={filteredKeywords} />
          ) : (
            <div className="text-center">
              <p className="text-xl text-slate-500 dark:text-slate-400">
                No trends found matching your filters.
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>
            Data sources: Reuters, BBC News, Bloomberg, The Guardian, Financial Times,
            TechCrunch, CNBC, Wall Street Journal, and other leading global news outlets
          </p>
          <p className="mt-2">
            Updated daily • Last update: December 10, 2025
          </p>
        </div>
      </div>
    </div>
  );
}
