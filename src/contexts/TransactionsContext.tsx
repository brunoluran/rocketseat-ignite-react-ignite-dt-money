import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { API } from '../services'

interface ITransactions {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface ICreateTransaction {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface ITransactionsContext {
  transactions: ITransactions[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: ICreateTransaction) => Promise<void>
}

export const TransactionsContext = createContext({} as ITransactionsContext)

interface ITransactionsProvider {
  children: ReactNode
}

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const { data } = await API.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(data)
  }, [])

  const createTransaction = useCallback(async (data: ICreateTransaction) => {
    const { description, type, category, price } = data

    const response = await API.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
