'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import {
    CheckCircle2,
    Clock,
    BarChart3,
    Wallet,
    ShoppingCart
} from 'lucide-react';

// Tipagem para a Venda
type Sale = {
    id: string;
    product: string;
    client: string;
    value: number;
    commission: number;
    status: 'Concluída' | 'Pendente';
    date: string;
};

// --- TODO: Integração real com Supabase (ou banco de dados) ---
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// 
// export default function MinhasVendas() {
//   const supabase = createClientComponentClient()
//   ...
//   useEffect(() => {
//     async function fetchSales() {
//       const { data: { session } } = await supabase.auth.getSession()
//       if (!session) return // Redirecionar para login
//       const { data, error } = await supabase
//         .from('vendas')
//         .select('*')
//         .eq('user_id', session.user.id)
//       if (data) setSales(data)
//     }
//     fetchSales()
//   }, [])
// }

// Dados Mocados para demonstração do visual e lógica
const mockSales: Sale[] = [
    {
        id: 'VND-001',
        product: 'Curso Especialista em Vendas',
        client: 'João Silva',
        value: 5000,
        commission: 2500,
        status: 'Concluída',
        date: '04 Mar 2026',
    },
    {
        id: 'VND-002',
        product: 'Mentoria VIP',
        client: 'Maria Oliveira',
        value: 12000,
        commission: 6000,
        status: 'Pendente',
        date: '05 Mar 2026',
    },
    {
        id: 'VND-003',
        product: 'E-book Dominando o Mercado',
        client: 'Carlos Andrade',
        value: 1500,
        commission: 750,
        status: 'Concluída',
        date: '05 Mar 2026',
    }
];

export default function MinhasVendas() {
    const [sales, setSales] = useState<Sale[]>([]); // Inicialmente vazio para demonstrar carregamento ou empty state, altere para mockSales se quiser ver a tabela
    const [isLoading, setIsLoading] = useState(true);

    // Simulação de busca no banco de dados
    useEffect(() => {
        const fetchSales = async () => {
            // Simula o tempo de resposta do servidor (Supabase, etc)
            setTimeout(() => {
                // Altere para "setSales([])" para ver o Empty State
                setSales(mockSales);
                setIsLoading(false);
            }, 1000);
        };

        fetchSales();
    }, []);

    // Cálculos Automáticos
    const completedSalesCount = sales.filter(s => s.status === 'Concluída').length;
    const pendingSalesCount = sales.filter(s => s.status === 'Pendente').length;
    const totalCommissions = sales.reduce((acc, current) => acc + current.commission, 0);
    const releasedCommissions = sales
        .filter(s => s.status === 'Concluída')
        .reduce((acc, current) => acc + current.commission, 0);

    // Formatação em Metical (MT)
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-MZ', {
            style: 'currency',
            currency: 'MZN',
            minimumFractionDigits: 2
        }).format(value).replace('MZN', 'MT');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
            <Sidebar />
            <div className="flex-1 flex flex-col pb-20 md:pb-0">
                <Header />

                <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
                    {/* Cabeçalho */}
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Minhas Vendas</h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Acompanhe suas vendas concluídas e comissões
                        </p>
                    </div>

                    {/* Cards de Estatísticas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                        {/* Card 1: Vendas Concluídas */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                                    {isLoading ? '-' : completedSalesCount}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 mt-1">Vendas Concluídas</p>
                            </div>
                        </motion.div>

                        {/* Card 2: Vendas Pendentes */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-800 dark:text-white">
                                    {isLoading ? '-' : pendingSalesCount}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 mt-1">Vendas Pendentes</p>
                            </div>
                        </motion.div>

                        {/* Card 3: Total Comissões */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#137fec]">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white truncate">
                                    {isLoading ? '-' : formatCurrency(totalCommissions)}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 mt-1">Total Comissões</p>
                            </div>
                        </motion.div>

                        {/* Card 4: Comissões Liberadas */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Wallet size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white truncate">
                                    {isLoading ? '-' : formatCurrency(releasedCommissions)}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 mt-1">Comissões Liberadas</p>
                            </div>
                        </motion.div>

                    </div>

                    {/* Área de Conteúdo Principal */}
                    {isLoading ? (
                        <div className="w-full flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-[#137fec]/30 border-t-[#137fec] rounded-full animate-spin"></div>
                        </div>
                    ) : sales.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-12 lg:p-24 flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingCart className="text-slate-300 dark:text-slate-600" size={48} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                                Nenhuma venda concluída ainda
                            </h2>
                            <p className="text-slate-500 font-medium max-w-sm">
                                Suas vendas entregues aparecerão aqui
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                                            <th className="px-6 py-4">Produto</th>
                                            <th className="px-6 py-4">Cliente</th>
                                            <th className="px-6 py-4">Valor</th>
                                            <th className="px-6 py-4">Comissão</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {sales.map((sale, i) => (
                                            <motion.tr
                                                key={sale.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold text-slate-800 dark:text-white pr-4">{sale.product}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{sale.client}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold">{formatCurrency(sale.value)}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold text-[#137fec]">{formatCurrency(sale.commission)}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    {sale.status === 'Concluída' ? (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                            {sale.status}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                                            {sale.status}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-semibold text-slate-500">{sale.date}</span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                </main>
            </div>
        </div>
    );
}
