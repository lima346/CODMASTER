'use client';

import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  CheckCircle2,
  ExternalLink,
  Copy,
  LayoutGrid,
  List
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const stats = [
  { label: 'Total de Afiliações', value: '2', icon: Package, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { label: 'Total de Vendas', value: '0', icon: ShoppingCart, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { label: 'Comissões Geradas', value: '0.00 MT', icon: TrendingUp, color: 'text-purple-500', bgColor: 'bg-purple-50' },
];

const affiliatedProducts = [
  {
    id: 1,
    name: 'Fiora - Crescimento capilar',
    headerName: ['FIORA', 'CRESCIMENTO CAPILAR'],
    description: 'FIORA – Tratamento Capilar de Crescimento Ativo (90 Dias) A queda começa silenciosa... fios na almofada, no pente, no banho. Depois surgem falhas, entrada...',
    basePrice: '550.00 MT',
    yourPrice: '799.00 MT',
    commission: '249.00 MT',
    image: 'https://picsum.photos/seed/fiora/400/400',
    status: 'DISPONIVEL'
  },
  {
    id: 2,
    name: 'Sabão Africano',
    headerName: ['SABÃO AFRICANO'],
    description: 'O Segredo Natural da Pele Perfeita Descubra o poder do verdadeiro Sabão Africano, feito com ingredientes naturais selecionados para limpar profundament...',
    basePrice: '350.00 MT',
    yourPrice: '499.00 MT',
    commission: '149.00 MT',
    image: 'https://picsum.photos/seed/african-soap/400/400',
    status: 'DISPONIVEL'
  }
];

export default function LinksPage() {
  const [notification, setNotification] = React.useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const copyLink = (id: number) => {
    const mockUserId = 'user_88219';
    const affiliateLink = `${window.location.origin}/checkout/${id}?aff=${mockUserId}`;
    navigator.clipboard.writeText(affiliateLink);
    showNotification('Link de afiliado copiado!');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto w-full">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor, stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {affiliatedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group"
              >
                {/* Product Header */}
                <div className="bg-[#137fec] py-10 px-6 relative text-center">
                  <span className="absolute top-4 right-4 bg-blue-400/30 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    {product.status}
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    {product.headerName.map((line, idx) => (
                      <span key={idx} className="block">{line}</span>
                    ))}
                  </h3>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square p-8 flex items-center justify-center bg-white">
                  <div className="relative w-full h-full">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-slate-800">{product.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400">Preço Base:</span>
                      <span className="text-slate-700">{product.basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-slate-400">Seu Preço:</span>
                      <span className="text-[#137fec]">{product.yourPrice}</span>
                    </div>
                  </div>

                  {/* Commission Banner */}
                  <div className="mt-auto bg-[#f0fdf4] p-4 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">Sua Comissão:</span>
                    <span className="text-lg font-black text-[#16a34a]">{product.commission}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button 
                      onClick={() => copyLink(product.id)}
                      className="py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                    >
                      <Copy size={14} />
                      Copiar Link
                    </button>
                    <button className="py-2.5 px-4 rounded-xl bg-[#137fec] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
                      <ExternalLink size={14} />
                      Ver Página
                    </button>
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
