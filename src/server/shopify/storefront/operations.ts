export const ProductsQuery = /* GraphQL */ `
  query Products {
    products(first: 10) {
      edges {
        cursor
        node {
          id
          title
          description
          handle
          # adjacentVariants {
          #   __typename
          #   id
          # }
          variants(first: 10) {
            edges {
              cursor
              node {
                availableForSale
                id
                title
                # quantityAvailable
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`
