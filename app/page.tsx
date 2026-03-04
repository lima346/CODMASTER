'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Zap, 
  Wallet,
  Menu,
  X,
  User,
  Package,
  Link as LinkIcon,
  MessageCircle,
  Smartphone,
  Truck,
  DollarSign
} from 'lucide-react';
import { motion } from 'motion/react';

import Image from 'next/image';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-[#137fec]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#137fec] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Wallet size={24} />
            </div>
            <span className="text-xl font-black tracking-tight">CODMASTER</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-[#137fec] transition-colors">Preços</a>
            <a href="#integrations" className="text-sm font-bold text-slate-600 hover:text-[#137fec] transition-colors">Integrações</a>
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-[#137fec] transition-colors">Entrar</Link>
            <Link href="/login">
              <button className="px-6 py-3 bg-[#137fec] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95">
                Criar Conta Grátis
              </button>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4"
          >
            <a href="#pricing" className="block text-base font-bold text-slate-600">Preços</a>
            <a href="#integrations" className="block text-base font-bold text-slate-600">Integrações</a>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" className="w-full py-4 text-center font-bold text-slate-600 border border-slate-200 rounded-xl">Entrar</Link>
              <Link href="/login" className="w-full py-4 text-center font-bold text-white bg-[#137fec] rounded-xl">Criar Conta Grátis</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Venda Mais com <span className="text-[#137fec]">Marketing Digital</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Conecte fornecedores, afiliados e clientes. Venda via WhatsApp com pagamento na entrega. Automatize pedidos, logística e comissões em uma única plataforma.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <button className="w-full sm:w-auto px-10 py-5 bg-[#137fec] text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                Começar Agora
                <ArrowRight size={20} />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-lg">
              Ver Demonstração
            </button>
          </motion.div>

        </div>
      </section>


      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Como Funciona</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Processo simples em 7 passos para você começar a vender e ganhar comissões</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, icon: User, title: 'Cadastre-se como Afiliado', desc: 'Crie sua conta gratuitamente e tenha acesso a centenas de produtos para vender.' },
              { step: 2, icon: Package, title: 'Escolha Produtos', desc: 'Navegue pelo catálogo e escolha os produtos que deseja promover e vender.' },
              { step: 3, icon: LinkIcon, title: 'Gere seu Link', desc: 'Afilie-se ao produto e gere automaticamente seu link exclusivo de venda.' },
              { step: 4, icon: MessageCircle, title: 'Venda via WhatsApp', desc: 'Divulgue nas redes sociais, converse com clientes e feche vendas pelo WhatsApp.' },
              { step: 5, icon: Smartphone, title: 'Cliente Finaliza', desc: 'Cliente abre o link, preenche dados de entrega e confirma o pedido automaticamente.' },
              { step: 6, icon: Truck, title: 'Entrega Automática', desc: 'Nossa logística recolhe o produto e entrega ao cliente. Pagamento na entrega (COD).' },
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-blue-50 text-[#137fec] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#137fec] bg-blue-50 px-2 py-1 rounded">Passo {item.step}</span>
                </div>
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}

            {/* Step 7 - Full Width */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="md:col-span-3 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="w-16 h-16 bg-blue-50 text-[#137fec] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <DollarSign size={32} />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#137fec] bg-blue-50 px-2 py-1 rounded inline-block w-fit mx-auto md:mx-0">Passo 7</span>
                  <h3 className="text-2xl font-black">Receba sua Comissão</h3>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">Após a entrega confirmada, sua comissão é liberada automaticamente. Solicite o levantamento e receba seu dinheiro.</p>
                <div className="pt-4 flex items-center justify-center md:justify-start gap-2 text-[#137fec] font-bold text-xs uppercase tracking-widest">
                  <Zap size={14} />
                  <span>Comissão liberada apenas após entrega confirmada - Zero risco!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#137fec] rounded-lg flex items-center justify-center text-white">
                <Wallet size={18} />
              </div>
              <span className="text-lg font-black tracking-tight">CODMASTER</span>
            </div>
            <p className="text-slate-500 font-medium text-sm">A plataforma definitiva para empreendedores digitais que buscam escala e segurança.</p>
          </div>
          
          <div>
            <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-slate-400">Produto</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Checkout</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Integrações</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-slate-400">Empresa</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase text-xs tracking-widest text-slate-400">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-600">
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-[#137fec] transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2024 CODMASTER. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
