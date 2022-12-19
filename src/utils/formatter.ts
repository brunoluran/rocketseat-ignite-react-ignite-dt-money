export const dateFormatter = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const priceFormatter = (data: number, symbol = false) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(data)
  // .replace(!symbol ? 'R$' : '', '')
}
