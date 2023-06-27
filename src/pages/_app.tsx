import MainLayout from '@/components/layout/MainLayout'
import QuestionsProvider from '@/features/QuestionsProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <QuestionsProvider>
        <Component {...pageProps} />
      </QuestionsProvider>
    </MainLayout>
  )
}
