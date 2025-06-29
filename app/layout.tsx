import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

export const metadata = {
  title: 'Job Management Admin',
  description: 'Admin interface for managing job postings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <MantineProvider 
          defaultColorScheme="light"
          theme={{
            fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
            fontFamilyMonospace: 'Monaco, Courier, monospace',
            headings: {
              fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
            },
          }}
        >
          <ModalsProvider>
            <Notifications />
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}