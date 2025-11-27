import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { ProductCard } from '../components/ProductCard';
import { SortOption } from '../types';

export const Catalog: React.FC = () => {
  const { products, searchQuery } = useMarket();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialCategory = queryParams.get('category') || 'All';

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.POPULAR);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Search
    if (searchQuery) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.author?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Category
    if (selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory);
    }

    // Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    return result.sort((a, b) => {
        switch (sortBy) {
            case SortOption.PRICE_ASC: return a.price - b.price;
            case SortOption.PRICE_DESC: return b.price - a.price;
            case SortOption.NEWEST: return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            case SortOption.POPULAR: default: return b.reviewsCount - a.reviewsCount;
        }
    });
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs would go here */}
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Каталог товаров</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-800 p-6 overflow-y-auto' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center lg:hidden mb-6">
                <h2 className="text-xl font-bold dark:text-white">Фильтры</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="dark:text-white"><Filter className="w-6 h-6"/></button>
            </div>

            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h3 className="font-semibold mb-3 dark:text-gray-200">Категории</h3>
                    <div className="space-y-2">
                        {['All', 'Books', 'Stationery', 'Sets', 'Art'].map(cat => (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-slate-600 dark:text-slate-300">{cat === 'All' ? 'Все товары' : cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Slider Mock */}
                <div>
                    <h3 className="font-semibold mb-3 dark:text-gray-200">Цена, ₽</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <input 
                            type="number" 
                            value={priceRange[0]} 
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full p-2 border rounded text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        />
                        <span className="dark:text-white">-</span>
                        <input 
                            type="number" 
                            value={priceRange[1]} 
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full p-2 border rounded text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        />
                    </div>
                    <input 
                        type="range" 
                        min="0" max="10000" 
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-indigo-600"
                    />
                </div>

                {/* Additional Filters Mock */}
                <div>
                    <h3 className="font-semibold mb-3 dark:text-gray-200">Наличие</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-slate-600 dark:text-slate-300">В наличии</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer mt-2">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-slate-600 dark:text-slate-300">Со скидкой</span>
                    </label>
                </div>
            </div>
            
             <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-lg lg:hidden"
             >
                 Применить
             </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <button 
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg dark:text-white"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                    <Filter className="w-4 h-4" /> Фильтры
                </button>
                
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Сортировка:</span>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-white dark:bg-slate-800 border-none text-sm font-medium focus:ring-0 cursor-pointer dark:text-white"
                    >
                        <option value={SortOption.POPULAR}>По популярности</option>
                        <option value={SortOption.NEWEST}>Сначала новинки</option>
                        <option value={SortOption.PRICE_ASC}>Сначала дешевые</option>
                        <option value={SortOption.PRICE_DESC}>Сначала дорогие</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-slate-800 dark:text-white">Ничего не найдено</h3>
                    <p className="text-gray-500 dark:text-gray-400">Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};