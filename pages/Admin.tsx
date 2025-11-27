import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Wand2, Loader2, Save } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { Product, Category } from '../types';
import { generateProductDescription } from '../services/gemini';
import { Link, Navigate } from 'react-router-dom';

const MOCK_STATS = [
  { name: 'Пн', sales: 4000 },
  { name: 'Вт', sales: 3000 },
  { name: 'Ср', sales: 2000 },
  { name: 'Чт', sales: 2780 },
  { name: 'Пт', sales: 1890 },
  { name: 'Сб', sales: 2390 },
  { name: 'Вс', sales: 3490 },
];

export const Admin: React.FC = () => {
  const { user, products, addProduct } = useMarket();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('dashboard');
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'Books',
    inStock: true,
    rating: 0,
    reviewsCount: 0,
    image: 'https://picsum.photos/400/600',
    tags: [],
    title: '',
    author: '',
    price: 0,
    description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  if (!user || user.role !== 'admin') {
     return <Navigate to="/" replace />;
  }

  const handleAIAutoFill = async () => {
      if (!newProduct.title) {
          alert("Введите название товара для генерации");
          return;
      }
      setIsGenerating(true);
      const description = await generateProductDescription(
          newProduct.title, 
          newProduct.author, 
          newProduct.category || 'Books'
      );
      setNewProduct(prev => ({ ...prev, description }));
      setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newProduct.title && newProduct.price) {
          addProduct({
              ...newProduct,
              id: Date.now().toString(),
              rating: 0,
              reviewsCount: 0,
          } as Product);
          alert("Товар добавлен!");
          setNewProduct({ category: 'Books', inStock: true, image: 'https://picsum.photos/400/600', title: '', author: '', price: 0, description: '' });
      }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
            <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-4 py-2 rounded transition ${activeTab === 'dashboard' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
            >
                Дашборд
            </button>
            <button 
                onClick={() => setActiveTab('products')}
                className={`w-full text-left px-4 py-2 rounded transition ${activeTab === 'products' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
            >
                Товары
            </button>
            <div className="pt-8 border-t border-slate-700">
                <Link to="/" className="block px-4 py-2 text-slate-400 hover:text-white">← Вернуться в магазин</Link>
            </div>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'dashboard' ? (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-slate-900">Обзор продаж</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 text-sm mb-1">Выручка за сегодня</h3>
                        <p className="text-3xl font-bold">45,200 ₽</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 text-sm mb-1">Заказов</h3>
                        <p className="text-3xl font-bold">124</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 text-sm mb-1">Новых клиентов</h3>
                        <p className="text-3xl font-bold">18</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border h-96">
                    <h3 className="font-bold mb-4">Динамика продаж</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_STATS}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ) : (
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-slate-900">Управление товарами</h1>
                
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Add Form */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Добавить товар</h2>
                            <div className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-1">
                                <Wand2 className="w-3 h-3" /> AI Powered
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Название</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    value={newProduct.title}
                                    onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Автор (для книг)</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 border rounded"
                                        value={newProduct.author}
                                        onChange={e => setNewProduct({...newProduct, author: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Цена</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-2 border rounded"
                                        value={newProduct.price}
                                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Категория</label>
                                <select 
                                    className="w-full p-2 border rounded"
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                                >
                                    <option value="Books">Books</option>
                                    <option value="Stationery">Stationery</option>
                                    <option value="Sets">Sets</option>
                                    <option value="Art">Art</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium">Описание</label>
                                    <button 
                                        type="button" 
                                        onClick={handleAIAutoFill}
                                        disabled={isGenerating}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 disabled:opacity-50"
                                    >
                                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin"/> : <Wand2 className="w-3 h-3"/>}
                                        Сгенерировать AI
                                    </button>
                                </div>
                                <textarea 
                                    className="w-full p-2 border rounded h-32"
                                    value={newProduct.description}
                                    onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                                />
                            </div>

                            <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" /> Добавить товар
                            </button>
                        </form>
                    </div>

                    {/* Product List */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border overflow-hidden">
                        <h2 className="text-xl font-bold mb-4">Текущий ассортимент</h2>
                        <div className="overflow-y-auto max-h-[600px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b text-sm text-gray-500">
                                        <th className="py-2">Название</th>
                                        <th className="py-2">Категория</th>
                                        <th className="py-2 text-right">Цена</th>
                                        <th className="py-2 text-center">Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-3 pr-2">
                                                <div className="font-medium truncate max-w-[200px]">{p.title}</div>
                                                <div className="text-xs text-gray-400">{p.id}</div>
                                            </td>
                                            <td className="py-3 text-sm">{p.category}</td>
                                            <td className="py-3 text-right font-medium">{p.price} ₽</td>
                                            <td className="py-3 text-center">
                                                <span className={`inline-block w-2 h-2 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};