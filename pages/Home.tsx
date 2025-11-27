import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, PenTool, Gift, Palette, Cpu, Wifi, TreeDeciduous } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const { products, isDarkMode } = useMarket();
  
  // Mock selections
  const bestSellers = products.filter(p => p.reviewsCount > 500).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="space-y-12 pb-12 overflow-x-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* 3D Interactive Hero Showcase with Night Mode Animation */}
      <section 
        className={`
            min-h-[500px] flex flex-col items-center justify-center py-16 relative overflow-hidden transition-all duration-[2000ms]
            ${isDarkMode ? 'bg-[#080011]' : 'bg-gradient-to-br from-blue-500 to-cyan-400'}
        `}
      >
        
        {/* Ambient Background Effects - Night */}
        <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-[2000ms] ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Ambient Background Effects - Day */}
        <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-[2000ms] ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-white/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-yellow-200/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="text-center mb-10 z-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">Добро пожаловать в <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728]">Экосистему</span></h1>
            <p className="text-white/80 text-base max-w-xl mx-auto drop-shadow-md">Ваш премиальный доступ к миру литературы и творчества.</p>
        </div>

        <style>{`
          .hover-img-container {
            position: relative;
            width: 300px;
            max-width: 80vw;
            aspect-ratio: 1.586;
            perspective: 1000px;
            transition: transform .2s;
            --rotation: 12deg;
          }
          
          .hover-img-container:hover {
            transform: scale(1.05);
          }

          /* The Card Itself */
          .card-visual {
            width: 100%;
            height: 100%;
            border-radius: 16px;
            background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
            position: relative;
            box-shadow: 
                0 15px 40px rgba(0,0,0,0.5),
                inset 0 0 0 1px rgba(255, 215, 0, 0.1); 
            transition: transform .7s cubic-bezier(0.2, 0.8, 0.2, 1);
            transform-style: preserve-3d;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            color: #efefef;
          }

          /* Gold Texture Effect */
          .text-gold {
             background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
             -webkit-background-clip: text;
             background-clip: text;
             color: transparent;
          }
          .bg-gold-gradient {
             background: linear-gradient(135deg, #bf953f, #fcf6ba, #b38728);
          }
          .border-gold {
             border-color: #b38728;
          }

          /* Sensors */
          .sensor {
            position: absolute;
            z-index: 10;
          }
          .top-left { top: 0; left: 0; width: 50%; height: 50%; }
          .top-right { top: 0; right: 0; width: 50%; height: 50%; }
          .bottom-left { bottom: 0; left: 0; width: 50%; height: 50%; }
          .bottom-right { bottom: 0; right: 0; width: 50%; height: 50%; }
          .top-middle { top: 0; bottom: 50%; left: 30%; right: 30%; z-index: 11; }
          .bottom-middle { top: 50%; bottom: 0; left: 30%; right: 30%; z-index: 11; }

          /* Rotations */
          .top-left:hover ~ .card-visual { transform: rotate3d(-1, 1, 0, var(--rotation)); }
          .top-right:hover ~ .card-visual { transform: rotate3d(-1, -1, 0, var(--rotation)); }
          .bottom-left:hover ~ .card-visual { transform: rotate3d(1, 1, 0, var(--rotation)); }
          .bottom-right:hover ~ .card-visual { transform: rotate3d(1, -1, 0, var(--rotation)); }
          .top-middle:hover ~ .card-visual { transform: rotate3d(-1, 0, 0, var(--rotation)); }
          .bottom-middle:hover ~ .card-visual { transform: rotate3d(1, 0, 0, var(--rotation)); }

          /* Shimmer Effect on Card */
          .card-visual::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: skewX(-20deg);
            transition: 0.5s;
            pointer-events: none;
          }
          .hover-img-container:hover .card-visual::before {
             left: 150%;
             transition: 1s;
          }
        `}</style>

        <div className="hover-img-container">
            {/* Sensors */}
            <div className="sensor top-left"></div>
            <div className="sensor top-right"></div>
            <div className="sensor bottom-left"></div>
            <div className="sensor bottom-right"></div>
            <div className="sensor top-middle"></div>
            <div className="sensor bottom-middle"></div>

            {/* The Ecosystem Platinum Card */}
            <div className="card-visual">
                {/* Top Row */}
                <div className="flex justify-between items-start">
                    <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 rounded shadow-inner flex items-center justify-center overflow-hidden relative">
                         <div className="absolute inset-0 opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#000_5px,#000_6px)]"></div>
                         <Cpu className="text-yellow-900 w-6 h-6 relative z-10" />
                    </div>
                    
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 mb-0.5">
                             <TreeDeciduous className="w-6 h-6 text-[#fcf6ba]" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#fcf6ba] uppercase">Platinum</span>
                    </div>
                </div>

                {/* Middle Row */}
                <div className="flex items-center justify-between mt-2">
                     <Wifi className="w-8 h-8 text-gray-500 rotate-90 opacity-50" />
                     <h2 className="text-2xl font-black text-gold tracking-widest drop-shadow-md" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        ECOSYSTEM
                     </h2>
                     <div className="w-8"></div> {/* Spacer for center alignment */}
                </div>

                {/* Bottom Row */}
                <div className="mt-auto pt-4">
                     <div className="flex justify-center flex-col items-center mb-4">
                        <span className="font-handwriting text-[#fcf6ba] text-lg" style={{ fontFamily: 'cursive' }}>Platinum</span>
                        <span className="text-gold text-[10px] tracking-[0.3em] uppercase mt-0.5">VIP CLIENT</span>
                     </div>
                     <p className="text-base font-mono text-gray-300 tracking-widest text-center shadow-black drop-shadow-md">
                        IVAN IVANOV
                     </p>
                </div>
            </div>
        </div>

        <div className="mt-10 z-10">
             <Link to="/catalog" className="inline-flex items-center px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-[#fcf6ba] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Оформить заказ <ArrowRight className="ml-2 w-5 h-5"/>
             </Link>
        </div>
      </section>

      {/* Categories with 3D Keyboard Keys Style */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-12 text-slate-800 dark:text-white text-center md:text-left">Популярные категории</h2>
        
        <div className="keyboard-menu-wrapper flex justify-center items-center py-4">
          <style>{`
            .keyboard-menu-wrapper {
              display: flex;
              flex-wrap: wrap;
              gap: 30px;
              justify-content: center;
            }

            /* Base Key Style */
            .key-btn {
              position: relative;
              width: 160px;
              height: 140px;
              background: #f1f5f9; /* Slate-100 */
              border-radius: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-decoration: none;
              color: #475569;
              font-weight: bold;
              transition: all 0.1s ease;
              cursor: pointer;
              
              /* 3D Side & Shadow Construction */
              box-shadow: 
                0 12px 0 #cbd5e1, /* The physical side of the key */
                0 12px 20px rgba(0,0,0,0.15), /* Drop shadow */
                inset 0 4px 5px rgba(255,255,255,0.9); /* Top highlight */
              border: 1px solid rgba(255,255,255,0.5);
              text-align: center;
            }

            .key-btn span {
               margin-top: 10px;
               font-size: 14px;
               line-height: 1.2;
            }

            /* Dark Mode Support via parent class */
            .dark .key-btn {
              background: #1e293b;
              color: #94a3b8;
              box-shadow: 
                0 12px 0 #0f172a, /* Dark side */
                0 12px 20px rgba(0,0,0,0.5),
                inset 0 2px 2px rgba(255,255,255,0.1);
              border: 1px solid rgba(255,255,255,0.05);
            }

            /* Hover State (Light Up) */
            .key-btn:hover {
              transform: translateY(4px); /* Slight dip on hover */
              box-shadow: 
                0 8px 0 var(--key-shadow), /* Reduced side height */
                0 0 30px var(--key-glow), /* Neon Glow */
                inset 0 2px 5px rgba(255,255,255,0.4);
              background: var(--key-color);
              color: white;
              border-color: transparent;
            }

            /* Active State (Pressed) */
            .key-btn:active {
              transform: translateY(12px); /* Full press down */
              box-shadow: 
                0 0 0 var(--key-shadow), /* No side visible */
                inset 0 5px 10px rgba(0,0,0,0.2); /* Inner shadow */
            }

            /* Colors Definition */
            .key-blue {
               --key-color: #3b82f6;
               --key-shadow: #1d4ed8;
               --key-glow: rgba(59, 130, 246, 0.6);
            }
            .key-cyan {
               --key-color: #06b6d4;
               --key-shadow: #0891b2;
               --key-glow: rgba(6, 182, 212, 0.6);
            }
            .key-red {
               --key-color: #ef4444;
               --key-shadow: #b91c1c;
               --key-glow: rgba(239, 68, 68, 0.6);
            }
            .key-pink {
               --key-color: #ec4899;
               --key-shadow: #be185d;
               --key-glow: rgba(236, 72, 153, 0.6);
            }
            
            @media (max-width: 640px) {
               .key-btn {
                  width: 140px;
                  height: 120px;
               }
            }
          `}</style>
          
          <Link to="/catalog?category=Books" className="key-btn key-blue">
            <Book size={32} />
            <span>Художественная<br/>литература</span>
          </Link>
          
          <Link to="/catalog?category=Stationery" className="key-btn key-cyan">
            <PenTool size={32} />
            <span>Канцелярия<br/>для офиса</span>
          </Link>
          
          <Link to="/catalog?category=Books&tag=kids" className="key-btn key-red">
            <Palette size={32} />
            <span>Детские<br/>книги</span>
          </Link>
          
          <Link to="/catalog?category=Sets" className="key-btn key-pink">
            <Gift size={32} />
            <span>Подарочные<br/>наборы</span>
          </Link>
          
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Хиты продаж</h2>
             <Link to="/catalog" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline flex items-center">Смотреть все <ArrowRight className="w-4 h-4 ml-1"/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
              <div className="mb-6 md:mb-0 max-w-xl">
                  <h3 className="text-3xl font-bold mb-4">Читайте больше с Экосистема Premium</h3>
                  <p className="text-indigo-100 mb-6">Бесплатная доставка, скидка 10% на все товары и доступ к закрытым распродажам.</p>
                  <button className="px-6 py-2 bg-white text-indigo-900 font-bold rounded-lg hover:bg-gray-50 transition">Оформить подписку</button>
              </div>
              <div className="text-9xl opacity-20 rotate-12">📚</div>
          </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Новинки</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
};
