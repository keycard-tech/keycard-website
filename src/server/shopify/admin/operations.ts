import { graphql } from '../../../graphql/shopify/admin'

export const DiscountsQuery = graphql(`
  query Discounts {
    discountNodes(first: 10) {
      edges {
        node {
          id
          metafield(key: "") {
            description
            id
            definition {
              description
              constraints {
                key
              }
            }
          }
        }
      }
    }
    automaticDiscountNodes(first: 10) {
      edges {
        node {
          automaticDiscount {
            ... on DiscountAutomaticBasic {
              endsAt
              title
              summary
              combinesWith {
                productDiscounts
              }
              customerGets {
                items {
                  ... on DiscountProducts {
                    __typename
                    products(first: 10) {
                      edges {
                        node {
                          id
                          title
                        }
                      }
                    }
                    productVariants(first: 10) {
                      edges {
                        node {
                          id
                          title
                        }
                      }
                    }
                  }
                }
                value {
                  ... on DiscountAmount {
                    __typename
                    appliesOnEachItem
                    amount {
                      amount
                      currencyCode
                    }
                  }
                  ... on DiscountPercentage {
                    __typename
                    percentage
                  }
                  ... on DiscountOnQuantity {
                    __typename
                    effect {
                      ... on DiscountPercentage {
                        __typename
                        percentage
                      }
                      ... on DiscountAmount {
                        __typename
                        appliesOnEachItem
                        amount {
                          amount
                          currencyCode
                        }
                      }
                    }
                    quantity {
                      quantity
                    }
                  }
                }
              }
              discountClass
              status
              shortSummary
              minimumRequirement {
                ... on DiscountMinimumSubtotal {
                  __typename
                  greaterThanOrEqualToSubtotal {
                    amount
                    currencyCode
                  }
                }
                ... on DiscountMinimumQuantity {
                  __typename
                  greaterThanOrEqualToQuantity
                }
              }
              recurringCycleLimit
            }
          }
          id
        }
      }
    }
  }
`)
