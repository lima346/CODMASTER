'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Webhook, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  X,
  History
} from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const webhooks = [
  { id: 1, name: 'Notificação CRM', url: 'https://api.meucrm.com/v1/webhook', events: ['Venda Aprovada', 'Pix Gerado'], active: true },
  { id: 2, name: 'Suporte Slack', url: 'https://hooks.slack.com/services/...', events: ['Reembolso'], active: false },
];

export default function WebhooksPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/configuracoes/integracoes">
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tight">Webhooks</h1>
                <p className="text-slate-500 font-medium mt-1">Receba notificações em tempo real sobre eventos de vendas no seu servidor.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/configuracoes/webhooks/logs">
                <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                  <History size={18} />
                  Ver Logs
                </button>
              </Link>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
              >
                <Plus size={18} />
                Adicionar Webhook
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4">Nome</th>
                    <th className="px-6 py-4">URL de Destino</th>
                    <th className="px-6 py-4">Eventos Selecionados</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {webhooks.map((hook) => (
                    <tr key={hook.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-200">{hook.name}</td>
                      <td className="px-6 py-5 text-slate-500 dark:text-slate-400 font-mono text-xs">{hook.url}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1">
                          {hook.events.map(event => (
                            <span key={event} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-[#137fec] text-[10px] font-black rounded uppercase tracking-widest">
                              {event}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={hook.active} className="sr-only peer" readOnly />
                          <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#137fec]"></div>
                        </label>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-[#137fec] hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 flex items-center justify-center border-t border-slate-100 dark:border-slate-800">
              <button className="text-xs font-black text-[#137fec] hover:underline flex items-center gap-2 uppercase tracking-widest">
                Ver documentação da API
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h2 className="text-xl font-black tracking-tight">Adicionar Webhook</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Nome do Webhook</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Integração CRM"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500">URL da Endpoint</label>
                    <input 
                      type="url" 
                      placeholder="https://seu-servidor.com/webhook"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#137fec] transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Eventos para enviar</label>
                    <div className="space-y-3">
                      {['Venda Aprovada', 'Venda Cancelada', 'Boleto Gerado', 'Pix Gerado', 'Reembolso'].map(event => (
                        <label key={event} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec]" />
                          <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-500">Chave Secreta (Secret Key)</label>
                      <button className="text-[10px] font-black text-[#137fec] hover:underline uppercase tracking-widest">Gerar Nova</button>
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value="whsec_837b2d...91f"
                        className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 font-mono text-xs"
                      />
                      <button 
                        onClick={handleCopy}
                        className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-[#137fec] transition-all"
                      >
                        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic">Use esta chave para verificar a assinatura das notificações recebidas.</p>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 py-4 px-4 rounded-xl bg-[#137fec] text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                    Salvar Configurações
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
