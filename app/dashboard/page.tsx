'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Percent,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Total Sales', value: '1,284', trend: '+12.5%', isUp: true, icon: ShoppingCart, color: 'text-blue-500' },
  { label: 'Total Revenue', value: '45,200.00 MT', trend: '+8.2%', isUp: true, icon: DollarSign, color: 'text-emerald-500' },
  { label: 'Pending Orders', value: '12', trend: '-2.1%', isUp: false, icon: ReceiptText, color: 'text-amber-500' },
  { label: 'Conversion Rate', value: '3.4%', trend: '+0.5%', isUp: true, icon: Percent, color: 'text-indigo-500' },
];

import { ReceiptText } from 'lucide-react';

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 600 },
  { name: 'May', value: 300 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 700 },
];

const transactions = [
  { id: 1, name: 'João Silva', time: '2 mins ago', amount: '240.00 MT', status: 'PAID', initial: 'JS' },
  { id: 2, name: 'Maria Almeida', time: '15 mins ago', amount: '1,150.00 MT', status: 'PENDING', initial: 'MA' },
  { id: 3, name: 'Ricardo Costa', time: '1 hour ago', amount: '45.50 MT', status: 'PAID', initial: 'RC' },
  { id: 4, name: 'Lucas Pereira', time: '2 hours ago', amount: '980.00 MT', status: 'FAILED', initial: 'LP' },
  { id: 5, name: 'Ana Fernandes', time: '3 hours ago', amount: '125.00 MT', status: 'PAID', initial: 'AF' },
];

export default function DashboardPage() {
  const [period, setPeriod] = React.useState('30 Days');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
          <header>
            <h1 className="text-3xl font-black tracking-tight">Olá, Bem-vindo de volta!</h1>
            <p className="text-slate-500 font-medium mt-1">Confira o resumo das suas vendas hoje.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    stat.isUp 
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                  }`}>
                    {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
                <p className="text-[10px] text-slate-400 font-medium mt-1">vs last month</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold">Sales Overview</h3>
                  <p className="text-xs text-slate-500 font-medium">Growth performance over time</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button 
                    onClick={() => setPeriod('7 Days')}
                    className={cn(
                      "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                      period === '7 Days' ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
                    )}
                  >
                    7 Days
                  </button>
                  <button 
                    onClick={() => setPeriod('30 Days')}
                    className={cn(
                      "px-3 py-1.5 text-xs font-bold rounded-md transition-all",
                      period === '30 Days' ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
                    )}
                  >
                    30 Days
                  </button>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#137fec" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                        backgroundColor: '#0f172a',
                        color: '#fff'
                      }}
                      itemStyle={{ color: '#fff', fontWeight: 700 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#137fec" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
              <div className="space-y-6 flex-1">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      {tx.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{tx.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{tx.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{tx.amount}</p>
                      <p className={`text-[10px] font-bold ${
                        tx.status === 'PAID' ? 'text-emerald-500' : 
                        tx.status === 'PENDING' ? 'text-amber-500' : 'text-rose-500'
                      }`}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/vendas" className="w-full mt-8">
                <button className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-[#137fec] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  View All Sales
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
