'use client';

import React, { useState, use } from 'react';
import { 
  ArrowLeft, 
  Download, 
  DollarSign, 
  Package, 
  CheckCircle2,
  X,
  TrendingUp,
  Info
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const productsData = [
  { 
    id: 1, 
    name: 'Fiora - Crescimento capilar', 
    headerName: 'FIORA CRESCIMENTO CAPILAR',
    price: 550.00, 
    currency: 'MT',
    image: 'https://picsum.photos/seed/fiora/400/400', 
    stock: 45,
    description: 'A Mangueira Mágica Expansível de 15 metros é a solução perfeita para quem quer praticidade na hora de lavar o carro, regar o jardim ou limpar o quintal. Ela expande automaticamente com a pressão da água e encolhe sozinha após o uso, ocupando pouquíssimo espaço para guardar. Mais leve, mais resistente e muito mais prática que as mangueiras tradicionais!',
    benefits: [
      'Expande até 15 metros automaticamente',
      'Encolhe sozinha após desligar a água',
      'Super leve e fácil de manusear',
      'Não dobra nem cria nós',
      'Fácil de guardar',
      'Ideal para casa, quintal e jardim'
    ]
  },
  { 
    id: 2, 
    name: 'Mangueira Mágica 15 Metros', 
    headerName: 'MANGEIRAS MÁGICA 15 METROS',
    price: 650.00, 
    currency: 'MT',
    image: 'https://picsum.photos/seed/hose15/400/400', 
    stock: 29,
    description: 'A Mangueira Mágica Expansível de 15 metros é a solução perfeita para quem quer praticidade na hora de lavar o carro, regar o jardim ou limpar o quintal. Ela expande automaticamente com a pressão da água e encolhe sozinha após o uso, ocupando pouquíssimo espaço para guardar. Mais leve, mais resistente e muito mais prática que as mangueiras tradicionais!',
    benefits: [
      'Expande até 15 metros automaticamente',
      'Encolhe sozinha após desligar a água',
      'Super leve e fácil de manusear',
      'Não dobra nem cria nós',
      'Fácil de guardar',
      'Ideal para casa, quintal e jardim'
    ]
  },
  // ... other products can be added here
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = productsData.find(p => p.id === productId) || productsData[1]; // Fallback to hose if not found

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(product.price);
  const [isAffiliated, setIsAffiliated] = useState(false);

  const commission = sellingPrice - product.price;

  const handleConfirmAffiliation = () => {
    setIsAffiliated(true);
    setIsModalOpen(false);
    // In a real app, you'd save this to a database
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-10 max-w-[1400px] mx-auto w-full">
          {/* Back Button */}
          <Link href="/produtos" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#137fec] transition-colors mb-8 group">
            <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-[#137fec] group-hover:bg-blue-50 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold">Voltar</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image and Gallery */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
                {/* Blue Header Bar */}
                <div className="bg-[#137fec] py-6 px-8 flex items-center justify-between">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                    {product.headerName}
                  </h3>
                  <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                    <Download size={20} />
                  </button>
                </div>

                {/* Main Image */}
                <div className="relative aspect-square p-12 flex items-center justify-center bg-white">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    className="object-contain p-12"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-sm font-black text-slate-800 mb-6">Galeria (2 mídias)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group cursor-pointer">
                    <Image src="https://picsum.photos/seed/hose-gal1/600/400" alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">Foto 1</div>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group cursor-pointer">
                    <Image src="https://picsum.photos/seed/hose-gal2/600/400" alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">Foto 2</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details and Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{product.name}</h1>
              </div>

              {/* Price Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <DollarSign size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preço</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{product.price.toFixed(2)}</span>
                  <span className="text-sm font-bold text-slate-500">{product.currency}</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-[#137fec]">
                  <TrendingUp size={18} />
                  <span className="text-sm font-black">Defina seu preço ao se afiliar</span>
                </div>
                <p className="text-xs text-blue-600/80 font-medium leading-relaxed">
                  Você escolhe quanto vai vender este produto. Sua comissão será a diferença entre seu preço e o preço base.
                </p>
              </div>

              {/* Stock Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                    <Package size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estoque</span>
                </div>
                <span className="text-xl font-black text-slate-900">{product.stock}</span>
              </div>

              {/* Description */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-slate-800">Descrição do Produto</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {product.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-[#137fec] rounded-full" />
                    Principais Benefícios
                  </h4>
                  <ul className="space-y-2.5">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-slate-600 font-medium">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status and Affiliate Button */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Status:</span>
                  <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
                    DISPONIVEL
                  </span>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-[#137fec] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                >
                  <TrendingUp size={18} />
                  Afiliar-se a este Produto
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Affiliate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Definir Preço de Venda</h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">Escolha o preço pelo qual você vai vender este produto</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-[10px] font-black text-[#137fec] uppercase tracking-widest mb-1">Preço Base do Produto</p>
                  <h3 className="text-2xl font-black text-[#137fec]">{product.price.toFixed(2)} {product.currency}</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Seu Preço de Venda *</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg font-black focus:border-[#137fec] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold">Deve ser maior ou igual ao preço base</p>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Sua Comissão por Venda</p>
                    <h3 className="text-2xl font-black text-emerald-600">
                      {commission >= 0 ? commission.toFixed(2) : '0.00'} {product.currency}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="py-4 px-6 border-2 border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleConfirmAffiliation}
                    disabled={sellingPrice < product.price}
                    className="py-4 px-6 bg-[#137fec] text-white rounded-2xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmar Afiliação
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
