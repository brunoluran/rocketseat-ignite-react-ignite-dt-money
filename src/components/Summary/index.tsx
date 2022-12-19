import { SummaryCard, SummaryContainer } from './styled'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'

import { useSummary } from '../../hooks/useSummary'

import { priceFormatter } from '../../utils/formatter'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
