import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/apolloClient'
import ContentfulProvider from '@/context/ContentfulContext'
import { ThemeProviderWrap } from '@/styles/theme'
export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProviderWrap>
      <ApolloProvider client={client}>
        <ContentfulProvider>
          <Component {...pageProps} />
        </ContentfulProvider>
      </ApolloProvider>
    </ThemeProviderWrap>
  )
}
