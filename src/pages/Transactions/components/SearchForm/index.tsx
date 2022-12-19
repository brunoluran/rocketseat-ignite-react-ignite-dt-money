import { useContextSelector } from 'use-context-selector'
import { SearchFormContainer } from './styled'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TransactionsContext } from '../../../../contexts/TransactionsContext'

/*

*Por que um componente renderiza? 
* - Hooks changed
* - Props changed
* - Parent rerendered
--------------------------------
*Qual o fluxo de renderização? 
* 1. O React recria o HTML da interface daquele componente.
* 2 - Compara a versão do HTML recriada com a versão anterior.
* 3 - SE mudou alguma coisa, ele reescreve o HTML na tela.
--------------------------------
*Memo
*0. Hooks changed, Props changed (deep comparison)
* 0.1: Comparar a versão anterior dos hooks e props
* 0.2: SE mudou algo, ele vai permitir a nova renderização

*/

const searchFormSchema = z.object({
  query: z.string().min(1, 'Campo obrigatório'),
})

type SearchFormProps = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormProps>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormProps) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Pesqusiar
      </button>
    </SearchFormContainer>
  )
}
