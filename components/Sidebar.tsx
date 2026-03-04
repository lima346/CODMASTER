'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  ShoppingBag, 
  Link as LinkIcon, 
  TrendingUp, 
  DollarSign, 
  CircleDollarSign, 
  FileText, 
  User, 
  LogOut,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

import Image from 'next/image';

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingBag, label: 'Produtos', href: '/produtos' },
  { icon: LinkIcon, label: 'Links', href: '/links' },
  { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
  { icon: DollarSign, label: 'Vendas', href: '/vendas' },
  { icon: CircleDollarSign, label: 'Pagamentos', href: '/pagamentos' },
  { icon: FileText, label: 'Relatórios', href: '/relatorios' },
  { icon: User, label: 'Clientes', href: '/clientes' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-20 flex-shrink-0 bg-white border-r border-slate-200 flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center justify-center">
          <div className="w-10 h-10 bg-[#137fec] rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Wallet size={24} />
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-4 flex flex-col items-center">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-50 text-[#137fec] border border-blue-100" 
                    : "text-slate-400 hover:text-[#137fec] hover:bg-slate-50"
                )}
              >
                <item.icon size={22} className={cn(isActive ? "text-[#137fec]" : "text-slate-400 group-hover:text-[#137fec]")} />
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 cursor-pointer hover:border-[#137fec] transition-colors">
            <Image 
              alt="User" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/admin/100/100"
              width={40}
              height={40}
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="p-3 text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around z-50">
        {menuItems.slice(0, 5).map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-200",
                isActive ? "text-[#137fec]" : "text-slate-400"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
