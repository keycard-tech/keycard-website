type Price = {
  amount: number
  currencyCode?: string
}

const formatPrice = (props: Price): string => {
  const { amount, currencyCode = 'EUR' } = props
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount)
}

export { formatPrice }
