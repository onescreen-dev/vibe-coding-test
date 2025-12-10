import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { continents, regions, categories } from '../data/mockData';
import type { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
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
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors"
          >
            <FiFilter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <FiX className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {showFilters && (
          <div className="space-y-6 border-t border-slate-200 dark:border-slate-700 pt-4">
            {/* Continent Filter */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Geography
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
                    {continent.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            {filters.continent !== 'global' && availableRegions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Country
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
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Topics (Top 30)
              </h3>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full md:w-auto filter-button flex items-center justify-between gap-2 min-w-[200px]"
                >
                  <span>{selectedCategory ? selectedCategory.name : 'All Topics'}</span>
                  <FiChevronDown className="w-4 h-4" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-2 w-full md:w-96 bg-white dark:bg-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                    <button
                      onClick={() => handleCategoryChange('')}
                      className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-200 dark:border-slate-600"
                    >
                      <span className="font-medium">All Topics</span>
                    </button>
                    {categories.slice(0, 30).map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-600 border-b border-slate-200 dark:border-slate-600 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{category.name}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
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
