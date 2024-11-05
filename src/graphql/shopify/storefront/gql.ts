/* eslint-disable */
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  query Products {\n    products(first: 10) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          description\n          handle\n          # adjacentVariants {\n          #   __typename\n          #   id\n          # }\n          variants(first: 10) {\n            edges {\n              cursor\n              node {\n                availableForSale\n                id\n                title\n                # quantityAvailable\n                price {\n                  amount\n                  currencyCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.ProductsDocument,
  '\n  mutation Cart($merchandiseId: ID!, $quantity: Int!) {\n    cartCreate(\n      input: { lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }] }\n    ) {\n      cart {\n        id\n        createdAt\n        updatedAt\n        checkoutUrl\n        lines(first: 10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                }\n              }\n            }\n          }\n        }\n        attributes {\n          key\n          value\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalTaxAmount {\n            amount\n            currencyCode\n          }\n          totalDutyAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n':
    types.CartDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Products {\n    products(first: 10) {\n      edges {\n        cursor\n        node {\n          id\n          title\n          description\n          handle\n          # adjacentVariants {\n          #   __typename\n          #   id\n          # }\n          variants(first: 10) {\n            edges {\n              cursor\n              node {\n                availableForSale\n                id\n                title\n                # quantityAvailable\n                price {\n                  amount\n                  currencyCode\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n',
): typeof import('./graphql').ProductsDocument
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation Cart($merchandiseId: ID!, $quantity: Int!) {\n    cartCreate(\n      input: { lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }] }\n    ) {\n      cart {\n        id\n        createdAt\n        updatedAt\n        checkoutUrl\n        lines(first: 10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                }\n              }\n            }\n          }\n        }\n        attributes {\n          key\n          value\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n          totalTaxAmount {\n            amount\n            currencyCode\n          }\n          totalDutyAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n',
): typeof import('./graphql').CartDocument

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}
