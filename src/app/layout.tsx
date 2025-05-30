import { Metadata } from 'next';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'RentHive - Your Premier Rental Platform',
  description: 'Find and list rental properties with ease',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4F46E5',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
