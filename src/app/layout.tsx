import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'WebN3',
  description: 'Welcome to WebN3 a test web3 app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <header>
        <nav className="p-4 font-bold text-4xl">
          <Link href="/">WebN3</Link>
        </nav>
      </header>
      <main className="flex flex-col px-6 py-12 lg:px-8">
        {children}
      </main>
    </body>
    </html>
  );
}
