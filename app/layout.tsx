import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import { AdBlockGuard } from '@/components/AdBlockGuard'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fêrbûn AI – فێربوون',
  description: 'پلاتفۆرمی فێربوونی زمان بە هاوکاری AI – تەواو خۆرایی',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ku" dir="rtl" className={vazirmatn.variable}>
      <head>
        <Script id="adblock-detection" strategy="beforeInteractive">
          {`
            (function() {
              var ad = document.createElement('div');
              ad.className = 'ad-container';
              ad.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;';
              ad.innerHTML = '&nbsp;';
              document.body.appendChild(ad);
              var blocked = !(ad.offsetParent !== null);
              document.body.removeChild(ad);
              if (blocked) sessionStorage.setItem('adblock-detected', 'true');
            })();
          `}
        </Script>
        <Script id="service-worker-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').then(registration => {
                  console.log('SW registered:', registration);
                }).catch(err => console.log('SW registration failed:', err));
              });
            }
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-slate-950 text-white font-vazirmatn antialiased">
        <AdBlockGuard>
          {children}
        </AdBlockGuard>
        <Toaster position="top-center" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid #fbbf24' } }} />
      </body>
    </html>
  )
}
