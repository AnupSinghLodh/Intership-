import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategorySelect,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl lg:relative lg:w-64 lg:shadow-none">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
            <div className="flex items-center space-x-2">
              <Filter className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onCategorySelect('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === ''
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price: {formatPrice(priceRange[0])}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price: {formatPrice(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sort By</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                      sortBy === option.value
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={() => {
                onCategorySelect('');
                onPriceRangeChange([0, 100000]);
                onSortChange('name');
              }}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}