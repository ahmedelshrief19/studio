import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'Ahmed Elshrief AI Portfolio',
  description: 'The personal portfolio of Ahmed Elshrief, an aspiring AI Engineer. Showcasing interactive projects and an AI-powered chatbot built with Next.js, Genkit, and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Cedarville+Cursive&family=Lateef&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
        <Chatbot />
        <Toaster />
      </body>
    </html>
  );
}