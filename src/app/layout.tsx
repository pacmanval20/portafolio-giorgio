import type { Metadata, Viewport } from 'next';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/inter/latin-800.css';
import './globals.css';
import { profile, siteUrl, asset } from '@/lib/profile';

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: profile.title, template: `%s | ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name }],
  alternates: { canonical: `${siteUrl}/` },
  icons: { icon: asset('icon.svg') },
  openGraph: { type: 'website', locale: 'es_PE', url: `${siteUrl}/`, siteName: profile.title, title: profile.title, description: profile.description, images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: profile.title }] },
  twitter: { card: 'summary_large_image', title: profile.title, description: profile.description, images: [`${siteUrl}/og-image.png`] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0A0D14', colorScheme: 'dark' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
