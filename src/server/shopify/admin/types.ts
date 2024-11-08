export type DiscountsResponseBody = {
  discountNodes: {
    edges: Array<{
      node: {
        id: string
        metafield: null
      }
    }>
  }
  automaticDiscountNodes: {
    edges: Array<{
      node: {
        automaticDiscount: {
          endsAt: null
          title: string
          summary: string
          combinesWith: {
            productDiscounts: boolean
          }
          customerGets: {
            items: {
              __typename: 'DiscountProducts'
              products: {
                edges: Array<{
                  node: {
                    id: string
                    title: string
                  }
                }>
              }
              productVariants: {
                edges: Array<{
                  node: {
                    id: string
                    title: string
                  }
                }>
              }
            }
            value: {
              __typename: 'DiscountPercentage'
              percentage: number
            }
          }
          discountClass: 'PRODUCT'
          status: 'ACTIVE'
          shortSummary: string
          minimumRequirement: {
            __typename: 'DiscountMinimumQuantity'
            greaterThanOrEqualToQuantity: string
          }
          recurringCycleLimit: number
        }
        id: string
      }
    }>
  }
}
