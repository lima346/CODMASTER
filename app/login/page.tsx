'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
      <header className="p-6">
        <Link 
          href="/"
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-[#137fec] transition-colors group w-fit"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Voltar</span>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 -mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#137fec] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-2xl font-black">C</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">CODMASTER</h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest font-bold">Venda Mais, Ganhe Mais</p>
            </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Bem-vindo de volta</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Entre para acessar sua conta</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#137fec] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all font-medium"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  type="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2" htmlFor="password">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#137fec] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#137fec] focus:border-transparent transition-all font-medium"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            <Link href="/dashboard" className="block">
              <button 
                className="w-full bg-[#137fec] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                type="submit"
              >
                Entrar
              </button>
            </Link>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Não tem conta? {' '}
                <a className="text-[#137fec] font-bold hover:underline" href="#">Cadastre-se grátis</a>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="py-8 text-center space-y-2">
        <p className="text-sm text-slate-400 dark:text-slate-500 font-bold">Plataforma de vendas CODMASTER</p>
        <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">
          Precisa de ajuda? {' '}
          <a className="hover:text-[#137fec] transition-colors underline decoration-slate-300 dark:decoration-slate-700" href="#">Entre em contato com o suporte</a>
        </p>
      </footer>

      <div className="fixed bottom-6 right-6">
        <button 
          className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
