import type { Metadata } from 'next'
import { Geist, Geist_Mono, Montserrat } from 'next/font/google'
import { Providers } from './providers'
import QueryProvider from './QueryProvider'
import { Toaster } from 'react-hot-toast'
import './globals.scss'

const montserrat = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '2Q - Trang nhà cái trực tiếp bóng đá chất lượng cao',
  description:
    '2Q là thương hiệu nhà cái nổi bật năm 2024. 2q.com trang trực tiếp bóng đá đường truyền mạnh tải nhanh.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="build-time" content={process.env.BUILD_TIME} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'white' }}>
          <QueryProvider>{children}</QueryProvider>
        </Providers>
        {/* <Customer top={'200px'} /> */}
        <Toaster />
      </body>
    </html>
  )
}
