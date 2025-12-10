import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { continents, regions, categories } from '../data/mockData';
import type { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleContinentChange = (continentId: string) => {
    onFilterChange({
      ...filters,
      continent: continentId,
      region: '', // Reset region when continent changes
    });
  };

  const handleRegionChange = (regionId: string) => {
    onFilterChange({ ...filters, region: regionId });
  };

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({ ...filters, category: categoryId });
    setShowCategoryDropdown(false);
  };

  const clearFilters = () => {
    onFilterChange({
      continent: 'global',
      region: '',
      category: '',
      search: '',
    });
  };

  const availableRegions = regions.filter(
    r => filters.continent === 'global' || r.continent === filters.continent
  );

  const hasActiveFilters = filters.continent !== 'global' || filters.region || filters.category;

  const selectedCategory = categories.find(c => c.id === filters.category);

  return (
    <div className="bg-white shadow-sm mb-6 border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-slate-800 hover:text-politico-red transition-colors font-semibold"
          >
            <FiFilter className="w-5 h-5" />
            <span className="uppercase tracking-wide text-sm">{t('filters.continent')}</span>
            {hasActiveFilters && (
              <span className="bg-politico-red text-white text-xs px-2 py-1 rounded uppercase tracking-wide">
                Active
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-politico-red hover:text-politico-darkRed transition-colors font-medium"
            >
              <FiX className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="space-y-6 border-t border-gray-300 pt-4">
            {/* Continent Filter */}
            <div>
              <h3 className="text-sm font-bold text-politico-darkGray mb-3 uppercase tracking-wide">
                {t('filters.continent')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {continents.map(continent => (
                  <button
                    key={continent.id}
                    onClick={() => handleContinentChange(continent.id)}
                    className={`filter-button ${
                      filters.continent === continent.id ? 'active' : ''
                    }`}
                  >
                    {t(`continents.${continent.id}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            {filters.continent !== 'global' && availableRegions.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-politico-darkGray mb-3 uppercase tracking-wide">
                  {t('filters.region')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableRegions.map(region => (
                    <button
                      key={region.id}
                      onClick={() => handleRegionChange(region.id)}
                      className={`filter-button ${
                        filters.region === region.id ? 'active' : ''
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold text-politico-darkGray mb-3 uppercase tracking-wide">
                {t('filters.category')}
              </h3>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full md:w-auto filter-button flex items-center justify-between gap-2 min-w-[200px]"
                >
                  <span>{selectedCategory ? t(`categories.${selectedCategory.id}`) : t('filters.all_categories')}</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-2 w-full md:w-96 bg-white shadow-xl border border-gray-300 max-h-96 overflow-y-auto">
                    <button
                      onClick={() => handleCategoryChange('')}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-200"
                    >
                      <span className="font-medium">{t('filters.all_categories')}</span>
                    </button>
                    {categories.slice(0, 30).map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{t(`categories.${category.id}`)}</span>
                          <span className="text-xs text-gray-500">
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
