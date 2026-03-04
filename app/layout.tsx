import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'CODMASTER | Plataforma de Vendas',
  description: 'Venda mais, ganhe mais com a CODMASTER.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${manrope.variable}`}>
      <body className="antialiased bg-slate-50 dark:bg-[#101922] text-slate-900 dark:text-slate-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
