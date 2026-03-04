'use client';

import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import Image from 'next/image';

const customers = [
  { id: 1, name: 'Ricardo Lemos', email: 'ricardo.lemos@email.com', phone: '(11) 98877-6655', location: 'São Paulo, SP', totalSpent: 'R$ 2.450,00', orders: 5, initial: 'RL' },
  { id: 2, name: 'Mariana Silva', email: 'mariana.silva@gmail.com', phone: '(21) 97766-5544', location: 'Rio de Janeiro, RJ', totalSpent: 'R$ 97,00', orders: 1, initial: 'MS' },
  { id: 3, name: 'João Carlos', email: 'joao.carlos@outlook.com', phone: '(31) 96655-4433', location: 'Belo Horizonte, MG', totalSpent: 'R$ 12.400,00', orders: 12, initial: 'JC' },
  { id: 4, name: 'Ana Almeida', email: 'ana.almeida@empresa.com', phone: '(41) 95544-3322', location: 'Curitiba, PR', totalSpent: 'R$ 840,00', orders: 3, initial: 'AA' },
  { id: 5, name: 'Paulo Vieira', email: 'paulo.coach@vendas.com', phone: '(11) 94433-2211', location: 'São Paulo, SP', totalSpent: 'R$ 29,90', orders: 1, initial: 'PV' },
];

export default function CustomersPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Clientes</h1>
              <p className="text-slate-500 font-medium mt-1">Base de clientes e histórico de relacionamento.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
              <UserPlus size={18} />
              Novo Cliente
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-[#137fec] rounded-xl">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total de Clientes</p>
                  <h3 className="text-2xl font-black">1,248</h3>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl">
                  <UserPlus size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Novos (30 dias)</p>
                  <h3 className="text-2xl font-black">142</h3>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Principais Regiões</p>
                  <h3 className="text-lg font-black">Sudeste (65%)</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative group flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar cliente por nome, email ou CPF..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Filter size={18} />
                Filtros Avançados
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4">Contato</th>
                    <th className="px-6 py-4">Localização</th>
                    <th className="px-6 py-4">Pedidos</th>
                    <th className="px-6 py-4">Total Gasto</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {customers.map((customer, i) => (
                    <motion.tr 
                      key={customer.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-600 dark:text-slate-400">
                            {customer.initial}
                          </div>
                          <div>
                            <span className="text-sm font-bold block">{customer.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Cliente desde 2023</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <Mail size={12} />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <Phone size={12} />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <MapPin size={12} />
                          {customer.location}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold">{customer.orders}</td>
                      <td className="px-6 py-5 text-sm font-black text-[#137fec]">{customer.totalSpent}</td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                          <ExternalLink size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
