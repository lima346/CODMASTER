'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Code,
  X,
  Copy,
  Check,
  Play,
  Send,
  MessageSquare,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const logs = [
  { id: '#evt_9a8b7c', time: '14/05/2024 14:22:05', url: 'https://api.myapp.com/webhook/codmaster', event: 'Venda Aprovada', status: 200, statusText: 'OK', duration: '88ms' },
  { id: '#evt_1a2b3c', time: '14/05/2024 14:21:48', url: 'https://hooks.external-tool.io/v1/inbound', event: 'Pix Gerado', status: 500, statusText: 'ERROR', duration: '3502ms' },
  { id: '#evt_4d5e6f', time: '14/05/2024 14:20:12', url: 'https://api.myapp.com/webhook/codmaster', event: 'Assinatura Cancelada', status: 204, statusText: 'NO_CONTENT', duration: '115ms' },
  { id: '#evt_7g8h9i', time: '14/05/2024 14:18:55', url: 'https://broken-endpoint.com/webhook', event: 'Venda Aprovada', status: 404, statusText: 'NOT_FOUND', duration: '45ms' },
  { id: '#evt_1j2k3l', time: '14/05/2024 14:15:30', url: 'https://api.myapp.com/webhook/codmaster', event: 'Chargeback', status: 200, statusText: 'OK', duration: '92ms' },
];

const payloadExample = {
  id: "evt_1a2b3c",
  type: "pix.generated",
  created_at: "2024-05-14T14:21:48Z",
  data: {
    transaction: {
      id: "trx_99283",
      amount: 129.90,
      currency: "BRL",
      status: "pending"
    },
    customer: {
      name: "Ricardo Oliveira",
      email: "ricardo@example.com",
      document: "123.456.789-00"
    }
  },
  metadata: {
    origin: "checkout_v3",
    platform: "web"
  }
};

const responseExample = {
  error: "Internal Server Error",
  message: "Database connection timeout after 3502ms",
  code: 500,
  timestamp: "2024-05-14T14:21:51.982Z"
};

export default function WebhookLogsPage() {
  const [selectedLog, setSelectedLog] = React.useState<any>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/configuracoes/webhooks">
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-black tracking-tight">Logs de Webhooks</h1>
                <p className="text-slate-500 font-medium mt-1">Acompanhe o histórico de envios e respostas dos seus webhooks.</p>
              </div>
            </div>
            <Link href="/configuracoes/webhooks">
              <button className="px-6 py-3 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
                Voltar
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-500">+0.2%</span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Taxa de Sucesso (24h)</p>
              <h3 className="text-2xl font-black mt-1">98.5%</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[#137fec]">
                  <Send size={20} />
                </div>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Total de Envios</p>
              <h3 className="text-2xl font-black mt-1">14,205</h3>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Hoje</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-500">
                  <Clock size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-500">-15ms</span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Média de Resposta</p>
              <h3 className="text-2xl font-black mt-1">124ms</h3>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-500">
                  <AlertCircle size={20} />
                </div>
                <span className="text-xs font-bold text-rose-500">+4</span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Falhas Críticas</p>
              <h3 className="text-2xl font-black mt-1">12</h3>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Buscar por ID ou URL..." 
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-[#137fec] transition-all font-bold"
                  />
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button className="px-3 py-1.5 text-[10px] font-black rounded-md transition-all uppercase tracking-widest">Todos</button>
                  <button className="px-3 py-1.5 text-[10px] font-black rounded-md bg-white dark:bg-slate-700 shadow-sm transition-all uppercase tracking-widest">Falhas</button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-[#137fec] transition-colors">
                  <RefreshCw size={18} />
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <Download size={16} />
                  Exportar CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4">ID do Evento</th>
                    <th className="px-6 py-4">Data e Hora</th>
                    <th className="px-6 py-4">URL de Destino</th>
                    <th className="px-6 py-4">Evento</th>
                    <th className="px-6 py-4">Status HTTP</th>
                    <th className="px-6 py-4 text-right">Resposta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {logs.map((log) => (
                    <tr 
                      key={log.id} 
                      onClick={() => setSelectedLog(log)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-[#137fec]">{log.id}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-semibold text-slate-500">{log.time}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-mono text-slate-400 truncate max-w-[200px] block">{log.url}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-[#137fec] text-[10px] font-black rounded uppercase tracking-widest">
                          {log.event}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            log.status >= 200 && log.status < 300 ? "bg-emerald-500" : 
                            log.status >= 400 ? "bg-rose-500" : "bg-amber-500"
                          )}></div>
                          <span className={cn(
                            "text-xs font-black uppercase tracking-widest",
                            log.status >= 200 && log.status < 300 ? "text-emerald-500" : 
                            log.status >= 400 ? "text-rose-500" : "text-amber-500"
                          )}>
                            {log.status} {log.statusText}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-xs font-bold text-slate-500">{log.duration}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500">Exibindo 1-5 de 1,452 logs</p>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#137fec] text-white text-xs font-bold">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">3</button>
                  <span className="px-1 text-slate-400">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold">58</button>
                </div>
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {selectedLog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLog(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec]">
                      <Code size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tight">Detalhes do Evento</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedLog.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#137fec] text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-xs">
                      <Play size={14} />
                      Reprocessar Envio
                    </button>
                    <button 
                      onClick={() => setSelectedLog(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">URL de Destino</label>
                    <p className="text-xs font-mono font-bold truncate">{selectedLog.url}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Status HTTP</label>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        selectedLog.status >= 200 && selectedLog.status < 300 ? "bg-emerald-500" : "bg-rose-500"
                      )}></div>
                      <p className={cn(
                        "text-xs font-black uppercase tracking-widest",
                        selectedLog.status >= 200 && selectedLog.status < 300 ? "text-emerald-500" : "text-rose-500"
                      )}>
                        {selectedLog.status} {selectedLog.statusText}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Data/Hora do Disparo</label>
                    <p className="text-xs font-bold">{selectedLog.time}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        Payload de Envio (JSON)
                      </h3>
                      <button 
                        onClick={() => handleCopy(JSON.stringify(payloadExample, null, 2), 'payload')}
                        className="p-1.5 text-slate-400 hover:text-[#137fec] transition-colors"
                      >
                        {copied === 'payload' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <pre className="p-6 bg-slate-900 text-blue-400 rounded-2xl text-[11px] font-mono leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
                      {JSON.stringify(payloadExample, null, 2)}
                    </pre>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={16} className="text-slate-400" />
                        Resposta do Servidor
                      </h3>
                      <button 
                        onClick={() => handleCopy(JSON.stringify(responseExample, null, 2), 'response')}
                        className="p-1.5 text-slate-400 hover:text-[#137fec] transition-colors"
                      >
                        {copied === 'response' ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Headers</p>
                        <pre className="text-[11px] font-mono text-slate-400 leading-relaxed">
                          Content-Type: application/json{"\n"}
                          Date: Tue, 14 May 2024 14:21:52 GMT{"\n"}
                          Server: nginx/1.18.0{"\n"}
                          Connection: keep-alive
                        </pre>
                      </div>
                      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Body</p>
                        <pre className="text-[11px] font-mono text-rose-400 leading-relaxed overflow-x-auto">
                          {JSON.stringify(responseExample, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
