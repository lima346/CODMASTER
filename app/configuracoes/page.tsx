'use client';

import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Share2, 
  Edit, 
  Save,
  ShieldCheck,
  Eye,
  EyeOff,
  BadgeCheck
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import Image from 'next/image';

const navItems = [
  { icon: User, label: 'Meu Perfil', href: '/configuracoes', active: true },
  { icon: Lock, label: 'Segurança', href: '/configuracoes/seguranca' },
  { icon: Bell, label: 'Notificações', href: '/configuracoes/notificacoes' },
  { icon: CreditCard, label: 'Pagamentos', href: '/configuracoes/pagamentos' },
  { icon: Share2, label: 'Integrações', href: '/configuracoes/integracoes' },
];

export default function SettingsPage() {
  const [showPass, setShowPass] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-[#101922]">
      <Sidebar />
      <div className="flex-1 flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
          <header>
            <h1 className="text-3xl font-black tracking-tight">Configurações da Conta</h1>
            <p className="text-slate-500 font-medium mt-1">Gerencie as informações da sua conta, segurança e preferências.</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                    item.active 
                      ? "bg-[#137fec] text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </aside>

            <div className="flex-1 space-y-8">
              <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-black mb-8 flex items-center gap-2">
                  <User size={20} className="text-[#137fec]" />
                  Informações Pessoais
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-50 dark:border-slate-800 overflow-hidden shadow-md relative">
                      <Image 
                        src="https://picsum.photos/seed/admin/200/200" 
                        alt="Profile" 
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#137fec] text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform">
                      <Edit size={14} />
                    </button>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-black text-lg">Sua Foto</h3>
                    <p className="text-slate-500 text-sm font-medium mt-1">PNG, JPG ou GIF. Máximo de 10MB.</p>
                    <div className="flex gap-3 mt-4 justify-center md:justify-start">
                      <button className="text-xs font-black py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">Upload</button>
                      <button className="text-xs font-black py-2 px-4 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">Remover</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Nome Completo</label>
                    <input 
                      type="text" 
                      defaultValue="Carlos Eduardo Silva"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">E-mail</label>
                    <input 
                      type="email" 
                      defaultValue="carlos.eduardo@codmaster.com.br"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">CPF / CNPJ</label>
                    <input 
                      type="text" 
                      defaultValue="123.456.789-00"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Telefone</label>
                    <input 
                      type="text" 
                      defaultValue="(11) 98765-4321"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-black mb-8 flex items-center gap-2">
                  <Lock size={20} className="text-[#137fec]" />
                  Segurança da Conta
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Senha Atual</label>
                    <div className="relative">
                      <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold pr-12"
                      />
                      <button 
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#137fec] transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Nova Senha</label>
                      <input 
                        type="password" 
                        placeholder="Mínimo 8 caracteres"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500">Confirmar Nova Senha</label>
                      <input 
                        type="password" 
                        placeholder="Repita a nova senha"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-[#137fec] shadow-sm">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-black">Autenticação em duas etapas (2FA)</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Adicione uma camada extra de proteção à sua conta.</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#137fec] text-white rounded-lg text-xs font-black hover:bg-blue-700 transition-all">
                      Ativar
                    </button>
                  </div>
                </div>
              </section>

              <div className="flex items-center justify-end gap-4 pb-12">
                <button className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                  Cancelar
                </button>
                <button className="px-8 py-3 bg-[#137fec] text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Save size={18} />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
