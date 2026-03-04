'use client';

import React from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  User, 
  School, 
  Check, 
  ShoppingCart, 
  RefreshCcw, 
  Send,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#101922]">
          <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white dark:bg-[#101922]">
            <div className="flex flex-col">
              <nav className="flex items-center text-[10px] font-black text-slate-500 dark:text-slate-400 gap-2 mb-1 uppercase tracking-widest">
                <Link href="/vendas" className="hover:text-[#137fec] transition-colors">Vendas</Link>
                <ChevronRight size={10} />
                <span className="text-slate-900 dark:text-slate-100">Detalhes do Pedido #{id}</span>
              </nav>
              <div className="flex items-center gap-4">
                <Link href="/vendas" className="flex items-center gap-1 text-slate-500 hover:text-[#137fec] transition-colors group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-bold">Voltar</span>
                </Link>
                <h2 className="text-xl font-black tracking-tight">Pedido #{id}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-rose-500 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-500/10 transition-colors flex items-center gap-2">
                <RefreshCcw size={14} />
                Reembolsar Venda
              </button>
              <button className="px-4 py-2 bg-[#137fec] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                <Send size={14} />
                Reenviar E-mail
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Informações do Pedido</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      PAGO
                    </span>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Data/Hora</label>
                      <p className="text-sm font-bold">12 Mai 2024, 14:30:15</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Método de Pagamento</label>
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-slate-400" />
                        <p className="text-sm font-bold">Cartão de Crédito</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">ID da Transação</label>
                      <p className="text-sm font-bold font-mono text-slate-500">tx_88219_blp_0x9a2</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg">Dados do Cliente</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec]">
                        <User size={24} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Nome Completo</label>
                        <p className="text-sm font-black">Ricardo Lemos</p>
                        <p className="text-xs text-slate-500 font-medium">ricardo.lemos@email.com</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">CPF</label>
                        <p className="text-sm font-bold">123.456.789-00</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Telefone</label>
                        <p className="text-sm font-bold">(11) 98877-6655</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg">Itens do Pedido</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Produto</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Quantidade</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Preço Unitário</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <School size={20} />
                              </div>
                              <span className="text-sm font-black">Curso de Finanças Pro</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold">01</td>
                          <td className="px-6 py-4 text-sm font-bold">499,90 MT</td>
                          <td className="px-6 py-4 text-sm font-black text-right">499,90 MT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg">Resumo Financeiro</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold">499,90 MT</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Taxas da Plataforma</span>
                      <span className="text-rose-500 font-bold">- 24,99 MT</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-500">Impostos (ISS/PIS/COFINS)</span>
                      <span className="text-slate-500 font-bold">0,00 MT</span>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-base font-black">Total Líquido</span>
                      <span className="text-2xl font-black text-[#137fec]">474,91 MT</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl flex justify-between items-center mt-4 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Valor Bruto</span>
                      <span className="text-sm font-black">499,90 MT</span>
                    </div>
                  </div>
                </section>

                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-lg">Histórico da Transação</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                      <div className="relative pl-10">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center z-10 border-2 border-white dark:border-slate-900">
                          <Check size={12} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-black">E-mail de acesso enviado</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">12 Mai, 14:31</p>
                        </div>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center z-10 border-2 border-white dark:border-slate-900">
                          <Check size={12} className="text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-black">Pagamento Aprovado</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">12 Mai, 14:30</p>
                        </div>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center z-10 border-2 border-white dark:border-slate-900">
                          <ShoppingCart size={12} className="text-[#137fec]" />
                        </div>
                        <div>
                          <p className="text-sm font-black">Pedido Criado</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">12 Mai, 14:28</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
