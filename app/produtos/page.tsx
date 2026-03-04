'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Link as LinkIcon, 
  Check,
  Copy,
  ExternalLink,
  Info
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const initialProducts = [
  { 
    id: 1, 
    name: 'Fiora - Crescimento capilar', 
    headerName: 'FIORA CRESCIMENTO CAPILAR',
    price: '550.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/fiora/400/400', 
    isAffiliated: true 
  },
  { 
    id: 2, 
    name: 'Mangueira Mágica 15 Metros', 
    headerName: 'MANGEIRAS MÁGICA 15 METROS',
    price: '650.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/hose15/400/400', 
    isAffiliated: false 
  },
  { 
    id: 3, 
    name: 'Mangueira Mágica 30 Metros', 
    headerName: 'MANGEIRAS MÁGICA 30 METROS',
    price: '1190.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/hose30/400/400', 
    isAffiliated: false 
  },
  { 
    id: 4, 
    name: 'Amassador de Alho em Inox', 
    headerName: 'AAMASSADOR DE ALHO - INOX',
    price: '250.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/garlic/400/400', 
    isAffiliated: false 
  },
  { 
    id: 5, 
    name: 'Cacto Dançante e Falante', 
    headerName: 'CACTO DANÇANTE E FALANTE',
    price: '150.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/cactus/400/400', 
    isAffiliated: false 
  },
  { 
    id: 6, 
    name: 'Viga Fresh Buffalo Rough', 
    headerName: 'VIGA FRESH BUFFALO ROUGH',
    price: '850.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/viga/400/400', 
    isAffiliated: false 
  },
  { 
    id: 7, 
    name: 'Arbain Cyproheptadine', 
    headerName: 'ARBAIN CYPROHEPTADINE',
    price: '420.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/arbain/400/400', 
    isAffiliated: false 
  },
  { 
    id: 8, 
    name: 'Pistola Massageadora Muscular', 
    headerName: 'PISTOLA MASSAGEADORA MUSCULAR',
    price: '1450.00', 
    currency: 'MT',
    image: 'https://picsum.photos/seed/gun/400/400', 
    isAffiliated: false 
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAffiliate = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isAffiliated: true } : p));
    showNotification('Você se afiliou com sucesso!');
  };

  const copyAffiliateLink = (id: number) => {
    const mockUserId = 'user_88219';
    const affiliateLink = `${window.location.origin}/checkout/${id}?aff=${mockUserId}`;
    navigator.clipboard.writeText(affiliateLink);
    showNotification('Link de afiliado copiado!');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.headerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8 max-w-[1600px] mx-auto w-full">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Catálogo de Produtos</h1>
              <p className="text-slate-500 text-sm font-medium">Explore produtos disponíveis para afiliação</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Info size={14} />
              Seu ID de Afiliado: <span className="text-[#137fec]">user_88219</span>
            </div>
          </header>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Buscar produtos por nome, descrição ou fornecedor..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative"
              >
                <Link href={`/produtos/${product.id}`} className="absolute inset-0 z-0" />
                
                {/* Blue Header Bar */}
                <div className="bg-[#137fec] py-3 px-4 text-center relative z-10">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-wider line-clamp-1">
                    {product.headerName}
                  </h3>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square p-6 flex items-center justify-center bg-white z-10">
                  <div className="relative w-full h-full">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 line-clamp-1">{product.name}</h4>
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-xl font-black text-slate-900">{product.price}</span>
                      <span className="text-xs font-bold text-slate-500">{product.currency}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 relative z-20">
                    {product.isAffiliated ? (
                      <>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            copyAffiliateLink(product.id);
                          }}
                          className="w-full py-2.5 px-4 rounded-lg bg-[#137fec] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                        >
                          <Copy size={14} />
                          Copiar Link de Venda
                        </button>
                        <div className="flex gap-2">
                          <Link href={`/produtos/${product.id}`} className="flex-1">
                            <button className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors">
                              <ExternalLink size={12} />
                              Ver Página
                            </button>
                          </Link>
                          <button className="flex-1 py-2 px-3 rounded-lg bg-[#f0fdf4] border border-[#dcfce7] text-[#16a34a] text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-default">
                            <Check size={12} />
                            Afiliado
                          </button>
                        </div>
                      </>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAffiliate(product.id);
                        }}
                        className="w-full py-2.5 px-4 rounded-lg bg-[#137fec] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10"
                      >
                        <LinkIcon size={14} className="rotate-45" />
                        Afiliar-se Agora
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white text-sm font-bold rounded-full shadow-2xl flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check size={12} />
            </div>
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
