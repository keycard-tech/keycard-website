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

export const CartMutation = /* GraphQL */ `
  mutation Cart($merchandiseId: ID!, $quantity: Int!) {
    cartCreate(
      input: { lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }] }
    ) {
      cart {
        id
        createdAt
        updatedAt
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        attributes {
          key
          value
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`
