import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionButton,
  TransactionType,
} from './styled'

import { TransactionsContext } from '../../contexts/TransactionsContext'

const NewTransactionFormSchema = z.object({
  description: z.string().min(1),
  price: z.number().min(1),
  category: z.string().min(1),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormProps = z.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormProps>({
    resolver: zodResolver(NewTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormProps) {
    await createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            {...register('category')}
          />

          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TransactionType onValueChange={onChange} value={value}>
                  <TransactionButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionButton>
                  <TransactionButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
