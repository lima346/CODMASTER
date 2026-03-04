'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Info,
    ChevronRight,
    Landmark,
    CreditCard,
    QrCode,
    X,
    CheckCircle2,
    Clock
} from 'lucide-react';

// --- TIPAGEM & MOCKS ---
// Tipagem para demonstração. O ideal é importar do global types.
type DadosFinanceiros = {
    saldoDisponivel: number;
    totalComissoes: number;
    totalLevantamentos: number;
    comissoesLiberadas: number;
    comissoesPendentes: number;
    levantamentosAprovados: number;
    levantamentosPendentes: number;
};

// --- TODO: Integração real com Supabase ---
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// ...

export default function PagamentosPage() {
    const [userName, setUserName] = useState("Luciano"); // Mock: Pegar do banco/auth
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [valorLevantamento, setValorLevantamento] = useState('');
    const [metodoSelecionado, setMetodoSelecionado] = useState('');

    // Mock de Dados
    const [dados, setDados] = useState<DadosFinanceiros>({
        saldoDisponivel: 0,
        totalComissoes: 0,
        totalLevantamentos: 0,
        comissoesLiberadas: 0,
        comissoesPendentes: 0,
        levantamentosAprovados: 0,
        levantamentosPendentes: 0,
    });

    // Simulação de busca no banco e cálculos
    useEffect(() => {
        const fetchFinanceiro = async () => {
            // Aqui entraria a query ao banco real (comissoes e levantamentos filter by user_id)
            setTimeout(() => {
                setDados({
                    saldoDisponivel: 14500.50, // Comissoes liberadas - Levantamentos aprovados
                    totalComissoes: 25000.00, // Soma de todas as comissões
                    totalLevantamentos: 10499.50, // Soma de todos os levantamentos
                    comissoesLiberadas: 18000.00,
                    comissoesPendentes: 7000.00,
                    levantamentosAprovados: 3499.50,
                    levantamentosPendentes: 7000.00,
                });
                setIsLoading(false);
            }, 1000);
        };

        fetchFinanceiro();
    }, []);

    // Formatação em Metical (MT)
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-MZ', {
            style: 'currency',
            currency: 'MZN',
            minimumFractionDigits: 2
        }).format(value).replace('MZN', 'MT');
    };

    // Função para solicitar levantamento
    const handleSolicitarLevantamento = (e: React.FormEvent) => {
        e.preventDefault();
        if (Number(valorLevantamento) > dados.saldoDisponivel) {
            alert('Valor excede o saldo disponível.');
            return;
        }
        if (!metodoSelecionado) {
            alert('Selecione um método de pagamento.');
            return;
        }

        // TODO: Inserir row no Supabase na tabela 'levantamentos' com status = 'pendente'
        console.log(`Solicitação Feita: Valor: ${valorLevantamento}, Método: ${metodoSelecionado}`);

        // Simulação visual de sucesso (Optimistic Update)
        setDados(prev => ({
            ...prev,
            saldoDisponivel: prev.saldoDisponivel - Number(valorLevantamento),
            levantamentosPendentes: prev.levantamentosPendentes + Number(valorLevantamento),
            totalLevantamentos: prev.totalLevantamentos + Number(valorLevantamento)
        }));

        setIsModalOpen(false);
        setValorLevantamento('');
        setMetodoSelecionado('');
        alert('Levantamento solicitado com sucesso! Status: Pendente.');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
            <Sidebar />
            <div className="flex-1 flex flex-col pb-20 md:pb-0 relative overflow-hidden">
                <Header />

                <main className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-5xl mx-auto w-full relative z-10">

                    {/* 1. Cabeçalho */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            Olá, {userName}!
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Aqui está o seu painel financeiro.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="w-full h-40 flex justify-center items-center">
                            <div className="w-8 h-8 border-4 border-[#137fec]/30 border-t-[#137fec] rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            {/* 2 & 3. Card Principal (Banner Gradiente) + Botão Saque */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="w-full bg-gradient-to-br from-[#137fec] to-blue-800 dark:from-[#0e5cad] dark:to-[#083a70] rounded-3xl p-6 md:p-10 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden"
                            >
                                {/* Elementos decorativos (círculos ao fundo) */}
                                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border-4 border-white/10 blur-sm"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border-4 border-white/10 blur-sm"></div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">

                                    {/* Lado Esquerdo: Saldo */}
                                    <div className="space-y-4 w-full md:w-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <Wallet size={20} className="text-white" />
                                            </div>
                                            <span className="text-blue-100 font-semibold text-sm uppercase tracking-wider">Saldo Disponível</span>
                                        </div>
                                        <h2 className="text-5xl md:text-6xl font-black tracking-tight">
                                            <span className="text-3xl text-blue-200 mr-2">MT</span>
                                            {new Intl.NumberFormat('pt-MZ', { minimumFractionDigits: 2 }).format(dados.saldoDisponivel)}
                                        </h2>

                                        {/* Barrinha Interna / Indicadores */}
                                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 mt-4 border-t border-white/20">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                    <ArrowDownRight size={16} className="text-rose-300" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Levantamentos</p>
                                                    <p className="font-bold">{formatCurrency(dados.levantamentosAprovados)}</p>
                                                </div>
                                            </div>
                                            <div className="sm:w-[1px] sm:h-auto bg-white/20"></div> {/* Divisor invisível no mobile, linha no desktop */}
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                    <ArrowUpRight size={16} className="text-emerald-300" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Comissões (Total)</p>
                                                    <p className="font-bold">{formatCurrency(dados.comissoesLiberadas)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Lado Direito / Ação Saque */}
                                    <div className="w-full md:w-auto flex flex-col items-center sm:items-end">
                                        <button
                                            disabled={dados.saldoDisponivel <= 0}
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full sm:w-auto px-8 py-4 bg-white text-[#137fec] font-black text-sm uppercase tracking-wide rounded-xl shadow-lg hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                                        >
                                            Solicitar Levantamento
                                        </button>
                                        {dados.saldoDisponivel <= 0 && (
                                            <p className="text-xs text-blue-200 mt-3 font-semibold text-center">*Saldo insuficiente para saque.</p>
                                        )}
                                    </div>

                                </div>
                            </motion.div>


                            {/* 4. Dois Cards Secundários */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">

                                {/* Card 1: Levantamentos */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                            <Landmark className="text-rose-500" size={20} /> Levantamentos
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-slate-500 font-semibold text-sm">Total Levantado</span>
                                                <span className="font-black text-xl text-slate-800 dark:text-white">{formatCurrency(dados.totalLevantamentos)}</span>
                                            </div>

                                            <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm">Aprovados</span>
                                                </div>
                                                <span className="font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(dados.levantamentosAprovados)}</span>
                                            </div>

                                            <div className="flex justify-between items-center bg-rose-50 dark:bg-rose-900/20 px-4 py-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-rose-500" />
                                                    <span className="text-rose-700 dark:text-rose-400 font-semibold text-sm">Pendentes</span>
                                                </div>
                                                <span className="font-bold text-rose-700 dark:text-rose-400">{formatCurrency(dados.levantamentosPendentes)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="flex items-center justify-between w-full mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-[#137fec] hover:text-blue-700 transition-colors group">
                                        Ver Todos os Levantamentos
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>

                                {/* Card 2: Comissões */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                            <BarChart3 className="text-emerald-500" size={20} /> Comissões
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end pb-4 border-b border-slate-100 dark:border-slate-800">
                                                <span className="text-slate-500 font-semibold text-sm">Total Gerado</span>
                                                <span className="font-black text-xl text-slate-800 dark:text-white">{formatCurrency(dados.totalComissoes)}</span>
                                            </div>

                                            <div className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold text-sm">Liberadas</span>
                                                </div>
                                                <span className="font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(dados.comissoesLiberadas)}</span>
                                            </div>

                                            <div className="flex justify-between items-center bg-rose-50 dark:bg-rose-900/20 px-4 py-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-rose-500" />
                                                    <span className="text-rose-700 dark:text-rose-400 font-semibold text-sm">Pendentes</span>
                                                </div>
                                                <span className="font-bold text-rose-700 dark:text-rose-400">{formatCurrency(dados.comissoesPendentes)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="flex items-center justify-between w-full mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-[#137fec] hover:text-blue-700 transition-colors group">
                                        Ver Todas as Comissões
                                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>

                            </div>

                            {/* 5. Bloco Informativo */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="mt-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start"
                            >
                                <div className="w-12 h-12 flex-shrink-0 bg-[#137fec] text-white rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-800 dark:text-white mb-4">Como funciona o saldo?</h4>
                                    <ul className="space-y-3 font-medium text-slate-600 dark:text-slate-400 text-sm list-inside">
                                        <li className="flex gap-2 items-start"><span className="text-[#137fec] mt-1">•</span> Suas comissões são liberadas automaticamente após a entrega confirmada dos pedidos.</li>
                                        <li className="flex gap-2 items-start"><span className="text-[#137fec] mt-1">•</span> O saldo disponível pode ser levantado a qualquer momento.</li>
                                        <li className="flex gap-2 items-start"><span className="text-[#137fec] mt-1">•</span> Levantamentos são processados em até 48 horas após aprovação.</li>
                                        <li className="flex gap-2 items-start"><span className="text-[#137fec] mt-1">•</span> Comissões pendentes são liberadas assim que os pedidos correspondentes forem entregues com sucesso.</li>
                                    </ul>
                                </div>
                            </motion.div>
                        </>
                    )}

                </main>
            </div>

            {/* Modal de Saque (Levantamento) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 border border-slate-200 dark:border-slate-800 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-[#137fec] rounded-2xl flex items-center justify-center mb-4">
                                    <Wallet size={24} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Solicitar Levantamento</h2>
                                <p className="text-slate-500 font-medium text-sm mt-1">Saldo disponível: <strong className="text-slate-800 dark:text-white">{formatCurrency(dados.saldoDisponivel)}</strong></p>
                            </div>

                            <form onSubmit={handleSolicitarLevantamento} className="space-y-6">

                                {/* Campo Valor */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Valor a Levantar (MT)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">MT</span>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            max={dados.saldoDisponivel}
                                            value={valorLevantamento}
                                            onChange={(e) => setValorLevantamento(e.target.value)}
                                            placeholder="0,00"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-[#137fec] focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>

                                {/* Seleção de Método */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Método de Pagamento</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setMetodoSelecionado('mpesa')}
                                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${metodoSelecionado === 'mpesa' ? 'border-[#137fec] bg-blue-50 dark:bg-blue-900/20 text-[#137fec]' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}
                                        >
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/M-PESA_LOGO-01.svg/1024px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-6 object-contain" />
                                            <span className="text-xs font-bold uppercase tracking-wider">M-Pesa</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMetodoSelecionado('emola')}
                                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${metodoSelecionado === 'emola' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'}`}
                                        >
                                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-xs">e-M</div>
                                            <span className="text-xs font-bold uppercase tracking-wider">e-Mola</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-[#137fec] text-white font-black rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all text-sm uppercase tracking-wider"
                                    >
                                        Confirmar Solicitação
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}
