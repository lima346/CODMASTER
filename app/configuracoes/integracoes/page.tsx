'use client';

import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  CreditCard, 
  Share2, 
  MessageSquare,
  BarChart3,
  Facebook,
  Webhook,
  Key,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navItems = [
  { icon: User, label: 'Meu Perfil', href: '/configuracoes' },
  { icon: Lock, label: 'Segurança', href: '/configuracoes/seguranca' },
  { icon: Bell, label: 'Notificações', href: '/configuracoes/notificacoes' },
  { icon: CreditCard, label: 'Pagamentos', href: '/configuracoes/pagamentos' },
  { icon: Share2, label: 'Integrações', href: '/configuracoes/integracoes', active: true },
];

const integrations = [
  { 
    id: 'whatsapp',
    name: 'WhatsApp', 
    desc: 'Conecte sua conta para receber notificações de vendas em tempo real via WhatsApp.', 
    icon: MessageSquare, 
    color: 'text-[#25D366]', 
    bgColor: 'bg-[#25D366]/10',
    enabled: true,
    action: 'Configurar'
  },
  { 
    id: 'analytics',
    name: 'Google Analytics', 
    desc: 'Acompanhe o comportamento dos seus clientes e conversões do seu checkout.', 
    icon: BarChart3, 
    color: 'text-[#F9AB00]', 
    bgColor: 'bg-[#F9AB00]/10',
    enabled: false,
    action: 'Conectar'
  },
  { 
    id: 'facebook',
    name: 'Facebook Pixel', 
    desc: 'Otimize suas campanhas de anúncios enviando eventos de compra e checkout.', 
    icon: Facebook, 
    color: 'text-[#1877F2]', 
    bgColor: 'bg-[#1877F2]/10',
    enabled: true,
    action: 'Configurar'
  },
  { 
    id: 'webhooks',
    name: 'Webhooks', 
    desc: 'Envie dados de vendas e eventos para qualquer URL ou sistema externo.', 
    icon: Webhook, 
    color: 'text-[#137fec]', 
    bgColor: 'bg-[#137fec]/10',
    enabled: true,
    badge: '3 Ativos',
    action: 'Gerenciar Webhooks',
    href: '/configuracoes/webhooks'
  },
  { 
    id: 'api-keys',
    name: 'Chaves de API', 
    desc: 'Chaves de acesso para integração direta com a API da CODMASTER.', 
    icon: Key, 
    color: 'text-slate-600', 
    bgColor: 'bg-slate-100 dark:bg-slate-800',
    enabled: true,
    action: 'Ver Chaves'
  },
];

import { RefreshCw } from 'lucide-react';

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <header>
            <h1 className="text-3xl font-black tracking-tight">Configurações da Conta</h1>
            <p className="text-slate-500 font-medium mt-1">Gerencie as conexões externas e ferramentas integradas à sua conta.</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {integrations.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-[#137fec]/50 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.bgColor, item.color)}>
                          <item.icon size={28} />
                        </div>
                        {item.badge ? (
                          <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            {item.badge}
                          </span>
                        ) : (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={item.enabled} className="sr-only peer" readOnly />
                            <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#137fec]"></div>
                          </label>
                        )}
                      </div>
                      <h3 className="text-lg font-black">{item.name}</h3>
                      <p className="text-sm text-slate-500 font-medium mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                    
                    {item.href ? (
                      <Link href={item.href} className="mt-8">
                        <button className="w-full py-3 px-4 rounded-xl bg-[#137fec] text-white font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
                          {item.action}
                        </button>
                      </Link>
                    ) : (
                      <button className="mt-8 w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs hover:bg-[#137fec] hover:text-white transition-all">
                        {item.action}
                      </button>
                    )}
                  </motion.div>
                ))}

                <div className="bg-slate-50 dark:bg-slate-800/20 p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center hover:border-[#137fec]/40 transition-all group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-[#137fec] transition-colors shadow-sm">
                    <Plus size={24} />
                  </div>
                  <h3 className="text-base font-black text-slate-700 dark:text-slate-300 mt-4">Nova Integração</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 px-4 uppercase tracking-widest">Solicite uma ferramenta personalizada</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 pb-12">
                <Link href="/configuracoes">
                  <button className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                    Voltar
                  </button>
                </Link>
                <button className="px-8 py-3 bg-[#137fec] text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                  <RefreshCw size={18} />
                  Sincronizar Todos
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
