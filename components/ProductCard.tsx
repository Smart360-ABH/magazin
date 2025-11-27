import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useMarket } from '../context/MarketContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useMarket();
  const isFavorite = favorites.includes(product.id);

  // Generate dynamic gradient colors based on product ID to simulate the nth-child effect
  const getGradient = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variants = [
      ['#ffbc00', '#ff0058'], // Orange/Pink
      ['#03a9f4', '#ff0058'], // Blue/Pink
      ['#4dff03', '#00d0ff'], // Green/Blue
      ['#7b4397', '#dc2430'], // Purple/Red
      ['#f12711', '#f5af19'], // Red/Yellow
    ];
    return variants[hash % variants.length];
  };

  const [color1, color2] = getGradient(product.id);

  const styles = {
    '--g-color-1': color1,
    '--g-color-2': color2,
  } as React.CSSProperties;

  return (
    <div className="card-wrapper h-full flex justify-center" style={styles}>
      <style>{`
        .card-box {
          position: relative;
          width: 100%;
          max-width: 320px;
          min-height: 400px; /* Ensure enough height */
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto; /* Center in grid cell */
          transition: 0.5s;
          z-index: 1;
        }

        .card-box::before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 50px;
          width: 50%;
          height: 100%;
          text-decoration: none;
          background: linear-gradient(315deg, var(--g-color-1), var(--g-color-2));
          border-radius: 8px;
          transform: skewX(15deg);
          transition: 0.5s;
        }

        .card-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50;
          width: 50%;
          height: 100%;
          background: linear-gradient(315deg, var(--g-color-1), var(--g-color-2));
          border-radius: 8px;
          transform: skewX(15deg);
          transition: 0.5s;
          filter: blur(30px);
        }

        .card-box:hover:before,
        .card-box:hover:after {
          transform: skewX(0deg);
          left: 20px;
          width: calc(100% - 40px);
        }

        /* Floating glass squares */
        .card-box .glass-span {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 5;
          pointer-events: none;
        }

        .card-box .glass-span::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: 0.1s;
          animation: animate 2s ease-in-out infinite;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }

        .card-box:hover .glass-span::before {
          top: -30px;
          left: 30px;
          width: 80px;
          height: 80px;
          opacity: 1;
        }

        .card-box .glass-span::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: 0.5s;
          animation: animate 2s ease-in-out infinite;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          animation-delay: -1s;
        }

        .card-box:hover .glass-span::after {
          bottom: -30px;
          right: 30px;
          width: 80px;
          height: 80px;
          opacity: 1;
        }

        @keyframes animate {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }

        .card-content {
          position: relative;
          left: 0;
          padding: 20px 20px;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.85); /* Dark background for contrast */
          backdrop-filter: blur(10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          z-index: 10;
          transition: 0.5s;
          color: #fff;
          display: flex;
          flex-direction: column;
        }

        .card-box:hover .card-content {
          left: -15px; /* Slight shift */
          padding: 20px 20px;
          transform: scale(1.02);
        }

        /* Helpers for content layout */
        .card-img-container {
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 15px;
        }
        .card-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }
        .card-box:hover .card-img-container img {
            transform: scale(1.1);
        }
      `}</style>

      <div className="card-box">
        <span className="glass-span"></span>
        <div className="card-content">
            {/* Image Area */}
            <div className="card-img-container relative">
                <img src={product.image} alt={product.title} />
                {product.oldPrice && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                )}
                <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition ${isFavorite ? 'text-red-500' : 'text-white/70'}`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Text Area */}
            <div className="flex-1 flex flex-col">
                <Link to={`/product/${product.id}`} className="block group">
                     <h2 className="text-xl font-bold mb-1 line-clamp-2 leading-tight group-hover:text-[var(--g-color-1)] transition-colors">
                        {product.title}
                     </h2>
                </Link>
                <p className="text-sm text-gray-300 mb-2">{product.author || product.category}</p>
                
                <div className="mt-auto">
                     <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                            <span className="text-xl font-bold">{product.price} ₽</span>
                            {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice} ₽</span>}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                             <Star className="w-4 h-4 fill-current"/>
                             <span className="text-sm">{product.rating}</span>
                        </div>
                     </div>
                     
                     <button 
                         onClick={() => addToCart(product)}
                         className="w-full py-2 bg-white text-slate-900 font-bold rounded hover:bg-[var(--g-color-1)] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                         style={{ boxShadow: '0 1px 15px rgba(0,0,0,0.1)' }}
                     >
                        <ShoppingCart className="w-4 h-4" /> В корзину
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
