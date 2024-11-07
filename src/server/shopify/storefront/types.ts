export type ProductsResponseBody = {
  products: {
    edges: Array<{
      cursor: string
      node: {
        id: string
        title: string
        description: string
        handle: string
        variants: {
          edges: Array<{
            cursor: string
            node: {
              availableForSale: boolean
              id: string
              title: string
              price: {
                amount: string
                currencyCode: string
              }
            }
          }>
        }
      }
    }>
  }
}

export type CartResponseBody = {
  cartCreate: {
    cart: {
      id: string
      createdAt: string
      updatedAt: string
      checkoutUrl: string
      lines: {
        edges: Array<{
          node: {
            id: string
            merchandise: {
              id: string
            }
          }
        }>
      }
      attributes: Array<never>
      cost: {
        totalAmount: {
          amount: string
          currencyCode: string
        }
        subtotalAmount: {
          amount: string
          currencyCode: string
        }
        totalTaxAmount: null
        totalDutyAmount: null
      }
    }
  }
}
