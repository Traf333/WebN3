import './globals.css';
import { Inter } from 'next/font/google';

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
      <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        {children}
      </main>
    </body>
    </html>
  );
}
