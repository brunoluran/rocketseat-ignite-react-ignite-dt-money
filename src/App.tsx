import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/Transactions'

import { theme } from './theme'
import { GlobalStyle } from './theme/global'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <TransactionsProvider>
        <GlobalStyle />
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
