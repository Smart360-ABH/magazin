import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User as UserIcon, Search, Menu, X, BookOpen, PenTool, Package, Facebook, Twitter, Instagram, Chrome, Moon, Sun } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { AIAssistant } from './AIAssistant';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, user, searchQuery, setSearchQuery, login, logout, isDarkMode, toggleTheme } = useMarket();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalog');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
              <BookOpen className="w-8 h-8" />
              <span className="hidden sm:inline">Экосистема</span>
            </Link>

            {/* Catalog Button (Desktop) */}
            <Link 
                to="/catalog" 
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                <Menu className="w-4 h-4" />
                Каталог
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl relative hidden sm:block">
              <input
                type="text"
                placeholder="Поиск книг, авторов, товаров..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 dark:text-white transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </form>

            {/* Actions */}
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-yellow-500 dark:text-indigo-400"
                title={isDarkMode ? "Включить светлую тему" : "Включить ночной режим"}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              <Link to="/favorites" className="hidden sm:block hover:text-indigo-600 dark:hover:text-indigo-400 transition relative">
                <Heart className="w-6 h-6" />
              </Link>
              
              <Link to="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                    <button className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <UserIcon className="w-6 h-6" />
                        <span className="text-sm font-medium hidden md:block">{user.name}</span>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100 dark:border-slate-700">
                        {user.role === 'admin' && (
                            <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Админ-панель</Link>
                        )}
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700">Профиль</Link>
                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700">Выйти</button>
                    </div>
                </div>
              ) : (
                <button 
                    onClick={() => login('user')} 
                    className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                    Войти
                </button>
              )}
              
              <button className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Search & Menu */}
          {isMenuOpen && (
             <div className="py-4 sm:hidden border-t dark:border-slate-700">
                 <form onSubmit={handleSearch} className="mb-4 relative">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                 </form>
                 <nav className="flex flex-col gap-2 dark:text-gray-200">
                     <Link to="/catalog" className="py-2 px-4 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Каталог</Link>
                     <Link to="/catalog?category=Books" className="py-2 px-4 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Книги</Link>
                     <Link to="/catalog?category=Stationery" className="py-2 px-4 rounded hover:bg-slate-50 dark:hover:bg-slate-800">Канцелярия</Link>
                     {!user && <button onClick={() => login('admin')} className="text-left py-2 px-4 text-xs text-gray-400">Вход (Демо Админ)</button>}
                 </nav>
             </div>
          )}
        </div>
        
        {/* Categories Bar (Desktop) */}
        <div className="hidden md:block bg-slate-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 py-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <Link to="/catalog?category=Books" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"><BookOpen className="w-4 h-4"/> Книги</Link>
                    <Link to="/catalog?category=Stationery" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"><PenTool className="w-4 h-4"/> Канцелярия</Link>
                    <Link to="/catalog?category=Sets" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"><Package className="w-4 h-4"/> Наборы</Link>
                    <Link to="/catalog?isNew=true" className="hover:text-indigo-600 text-green-600 dark:text-green-400">Новинки</Link>
                    <Link to="/catalog" className="hover:text-indigo-600 text-red-500 dark:text-red-400">% Акции</Link>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-white font-bold text-lg mb-4">Экосистема</h3>
                <p className="text-sm">Ваш лучший помощник в мире книг и творчества. Работаем с 2024 года.</p>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Покупателям</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">Доставка и оплата</a></li>
                    <li><a href="#" className="hover:text-white">Возврат товара</a></li>
                    <li><a href="#" className="hover:text-white">Бонусная программа</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Компания</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white">О нас</a></li>
                    <li><a href="#" className="hover:text-white">Вакансии</a></li>
                    <li><a href="#" className="hover:text-white">Контакты</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-semibold mb-4">Контакты</h4>
                <p className="text-sm">+79409435555</p>
                <p className="text-sm mt-2">service-abh@yandex.ru</p>
                
                <div className="mt-6">
                  <style>{`
                    .social-list {
                      display: flex;
                      padding: 0;
                      margin: 0;
                    }
                    .social-list li {
                      list-style: none;
                    }
                    .social-list li a {
                      width: 45px;
                      height: 45px;
                      background-color: #fff;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      margin-right: 10px;
                      border-radius: 50%;
                      position: relative;
                      overflow: hidden;
                      border: 2px solid #fff;
                      z-index: 1;
                    }
                    .social-list li a .icon {
                      position: relative;
                      color: #262626;
                      transition: .5s;
                      z-index: 3;
                    }
                    .social-list li a:hover .icon {
                      color: #fff;
                      transform: rotateY(360deg);
                    }
                    .social-list li a:before {
                      content: "";
                      position: absolute;
                      top: 100%;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      transition: .5s;
                      z-index: 2;
                    }
                    .social-list li a:hover:before {
                      top: 0;
                    }
                    
                    /* Facebook */
                    .social-list li:nth-child(1) a:before { background: #3b5999; }
                    /* Twitter */
                    .social-list li:nth-child(2) a:before { background: #55acee; }
                    /* Google/Chrome */
                    .social-list li:nth-child(3) a:before { background: #dd4b39; }
                    /* Instagram */
                    .social-list li:nth-child(4) a:before { background: #e4405f; }
                  `}</style>
                  <ul className="social-list">
                    <li><a href="#"><Facebook className="icon w-5 h-5"/></a></li>
                    <li><a href="#"><Twitter className="icon w-5 h-5"/></a></li>
                    <li><a href="#"><Chrome className="icon w-5 h-5"/></a></li>
                    <li><a href="#"><Instagram className="icon w-5 h-5"/></a></li>
                  </ul>
                </div>
            </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};