'use client';

import React from 'react';
import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Banknote,
    Smartphone,
    Wallet,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const sales = [
    { id: '#BP-88219', date: '12 Mai, 14:30', customer: 'Ricardo Lemos', product: 'Smartwatch X Pro', method: 'Dinheiro (COD)', status: 'Entregue', value: '499,90 MT', initial: 'RL' },
    { id: '#BP-88218', date: '12 Mai, 13:15', customer: 'Mariana Silva', product: 'Kit Maquiagem Premium', method: 'M-Pesa', status: 'Em Trânsito', value: '1.097,00 MT', initial: 'MS' },
    { id: '#BP-88215', date: '11 Mai, 18:45', customer: 'João Carlos', product: 'Fone de Ouvido Bluetooth', method: 'e-Mola', status: 'Devolvido', value: '1.200,00 MT', initial: 'JC' },
    { id: '#BP-88210', date: '11 Mai, 10:20', customer: 'Ana Almeida', product: 'Luminária LED', method: 'M-Pesa', status: 'Entregue', value: '149,00 MT', initial: 'AA' },
    { id: '#BP-88209', date: '10 Mai, 22:50', customer: 'Paulo Vieira', product: 'Tênis Esportivo Max', method: 'Dinheiro (COD)', status: 'Entregue', value: '2.529,90 MT', initial: 'PV' },
];

const statusStyles = {
    'Entregue': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'Em Trânsito': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'Devolvido': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

const methodIcons = {
    'Dinheiro (COD)': Banknote,
    'M-Pesa': Wallet,
    'e-Mola': Smartphone,
};

export default function PagamentosPage() {
    const [isExporting, setIsExporting] = React.useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert('CSV exportado com sucesso!');
        }, 2000);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
            <Sidebar />
            <div className="flex-1 flex flex-col pb-20 md:pb-0">
                <Header />
                <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">Relatório de Transações</h1>
                            <p className="text-slate-500 font-medium mt-1">Acompanhe todos os pedidos e entregas Cash on Delivery (COD).</p>
                        </div>
                        <button
                            onClick={handleExport}
                            disabled={isExporting}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed",
                                isExporting ? "bg-slate-400 shadow-none" : "bg-[#137fec] shadow-blue-500/20 hover:bg-blue-700"
                            )}
                        >
                            {isExporting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Exportando...
                                </>
                            ) : (
                                <>
                                    <Download size={18} />
                                    Exportar CSV
                                </>
                            )}
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar transação..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-[#137fec] transition-all"
                                />
                            </div>
                            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-[#137fec] transition-all font-semibold">
                                <option>Últimos 30 dias</option>
                                <option>Últimos 7 dias</option>
                                <option>Hoje</option>
                            </select>
                            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-[#137fec] transition-all font-semibold">
                                <option>Todos Status</option>
                                <option>Entregue</option>
                                <option>Em Trânsito</option>
                                <option>Devolvido</option>
                            </select>
                            <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm px-4 py-2.5 focus:ring-2 focus:ring-[#137fec] transition-all font-semibold">
                                <option>Todos Métodos</option>
                                <option>Dinheiro (COD)</option>
                                <option>M-Pesa</option>
                                <option>e-Mola</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                                        <th className="px-6 py-4">ID do Pedido</th>
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4">Cliente</th>
                                        <th className="px-6 py-4">Produto</th>
                                        <th className="px-6 py-4">Método</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Valor Total</th>
                                        <th className="px-6 py-4 text-right">Ações</th>
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
                                                <span className="text-sm font-bold text-[#137fec]">{sale.id}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-semibold text-slate-500">{sale.date}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-400">
                                                        {sale.initial}
                                                    </div>
                                                    <span className="text-sm font-bold">{sale.customer}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{sale.product}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    {React.createElement(methodIcons[sale.method as keyof typeof methodIcons], { size: 16 })}
                                                    <span className="text-xs font-semibold">{sale.method}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={cn(
                                                    "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                                    statusStyles[sale.status as keyof typeof statusStyles]
                                                )}>
                                                    {sale.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-black">{sale.value}</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link href={`/pagamentos/${sale.id.replace('#', '')}`}>
                                                    <button className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                                                        <Eye size={18} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-500">Mostrando 1-5 de 1,248 resultados</p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    <ChevronLeft size={18} />
                                </button>
                                <div className="flex items-center gap-1">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#137fec] text-white text-xs font-bold">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">2</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">3</button>
                                    <span className="px-1 text-slate-400">...</span>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">125</button>
                                </div>
                                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
