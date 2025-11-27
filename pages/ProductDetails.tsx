import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Share2, Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, cart, updateQuantity, toggleFavorite, favorites } = useMarket();
  const product = products.find(p => p.id === id);
  
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');

  if (!product) {
    return <div className="p-12 text-center dark:text-white">Товар не найден</div>;
  }

  const isFavorite = favorites.includes(product.id);
  const cartItem = cart.find(i => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Main Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {/* Thumbnails Mock */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-slate-800 border dark:border-slate-700 shrink-0 cursor-pointer hover:border-indigo-500">
                        <img src={product.image} className="w-full h-full object-cover rounded-lg opacity-70 hover:opacity-100" alt="thumb"/>
                    </div>
                ))}
            </div>
        </div>

        {/* Info */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}/>
                    ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{product.reviewsCount} отзыва</span>
                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Артикул: {product.id}0023</span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{product.title}</h1>
            {product.author && <Link to="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline mb-4 block">{product.author}</Link>}
            
            <div className="flex items-end gap-4 mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{product.price} ₽</span>
                {product.oldPrice && (
                    <div className="mb-2">
                        <span className="text-lg text-gray-400 line-through mr-2">{product.oldPrice} ₽</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded">-20%</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {quantity > 0 ? (
                    <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-xl h-12 w-full sm:w-40 dark:text-white">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700"><Minus className="w-4 h-4"/></button>
                        <span className="flex-1 text-center font-bold">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-700"><Plus className="w-4 h-4"/></button>
                    </div>
                ) : (
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-indigo-600 text-white font-bold h-12 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Добавить в корзину
                    </button>
                )}
                <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition ${isFavorite ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 dark:text-white'}`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Доставка завтра</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Гарантия качества</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
                <div className="flex gap-8">
                    <button 
                        className={`pb-4 font-medium transition ${activeTab === 'desc' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => setActiveTab('desc')}
                    >
                        Описание
                    </button>
                    <button 
                        className={`pb-4 font-medium transition ${activeTab === 'reviews' ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Отзывы ({product.reviewsCount})
                    </button>
                </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                {activeTab === 'desc' ? (
                    <div>
                        <p className="mb-4">{product.description}</p>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">Характеристики</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Издательство: Эксмо</li>
                            <li>Год издания: 2024</li>
                            <li>Тип обложки: Твердый переплет</li>
                            <li>Вес: 450 г</li>
                        </ul>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Mock Reviews */}
                        {[1, 2].map(i => (
                            <div key={i} className="border-b dark:border-slate-700 pb-4 last:border-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="font-bold text-slate-900 dark:text-white">Алексей П.</div>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="text-xs text-gray-400">12.05.2024</span>
                                </div>
                                <p>Отличный товар! Пришел быстро, упаковка целая. Качество на высоте.</p>
                            </div>
                        ))}
                        <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Показать все отзывы</button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Recommendations */}
      <section>
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
              ))}
          </div>
      </section>
    </div>
  );
};