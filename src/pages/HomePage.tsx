import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import WordCloudComponent from '../components/WordCloudComponent';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import type { FilterState } from '../types';
import { getKeywordsByFilter } from '../data/mockData';

export default function HomePage() {
  const { t } = useTranslation();
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
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            {t('home.hero_title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
            {t('home.hero_subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} initialValue={filters.search} />

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* Results Info */}
        <div className="mb-6 text-center">
          <p className="text-slate-700">
            {t('home.showing')} <span className="font-semibold text-sky-600">{filteredKeywords.length}</span> {t('home.trending_topics')}
            {filters.continent !== 'global' && (
              <span> {t('home.in')} <span className="font-semibold">{t(`continents.${filters.continent}`)}</span></span>
            )}
          </p>
        </div>

        {/* Word Cloud */}
        <div className="bg-white rounded-lg shadow-xl border-2 border-sky-100 p-6 md:p-12 min-h-[500px] flex items-center justify-center">
          {filteredKeywords.length > 0 ? (
            <WordCloudComponent keywords={filteredKeywords} />
          ) : (
            <div className="text-center">
              <p className="text-xl text-slate-600">
                {t('home.no_trends')}
              </p>
              <p className="text-sm text-slate-500 mt-2">
                {t('home.try_adjusting')}
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-600">
          <p>
            {t('home.data_sources')}
          </p>
          <p className="mt-2">
            {t('home.updated_daily')} • {t('home.last_update')}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
