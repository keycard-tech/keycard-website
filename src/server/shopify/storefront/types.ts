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
