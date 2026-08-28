import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lóng — Chinese for your world',
  description: 'A personalized Chinese learning adventure built around your goals, studies, career, and life.',
  applicationName: 'Lóng',
  manifest: '/manifest.webmanifest',
  robots: { index: false, follow: false, nocache: true },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Lóng' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#163f36',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><a className="skip-link" href="#main-content">Skip to learning content</a>{children}</body>
    </html>
  );
}
