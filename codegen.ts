/**
 * @see https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config for docs
 */

import './src/config/env.mjs'
import type { CodegenConfig } from '@graphql-codegen/cli'

const shopifyStorefrontSchema: CodegenConfig['schema'] = [
  {
    [`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token':
          process.env.SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN,
      },
    },
  },
]

const shopifyAdminSchema: CodegenConfig['schema'] = [
  {
    [`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`]:
      {
        headers: {
          'X-Shopify-Access-Token':
            process.env.SHOPIFY_ADMIN_API_PRIVATE_ACCESS_TOKEN,
        },
      },
  },
]

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/shopify/storefront/': {
      schema: shopifyStorefrontSchema,
      plugins: ['typescript'],
      preset: 'client',
      config: {
        documentMode: 'string',
      },
      documents: ['./src/server/shopify/storefront/operations.ts'],
    },
    './src/graphql/shopify/admin/': {
      schema: shopifyAdminSchema,
      plugins: ['typescript'],
      preset: 'client',
      config: {
        documentMode: 'string',
      },
      documents: ['./src/server/shopify/admin/operations.ts'],
    },
    './src/graphql/shopify/storefront/schema.graphql': {
      schema: shopifyStorefrontSchema,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
      documents: ['./src/server/shopify/storefront/operations.ts'],
    },
    './src/graphql/shopify/admin/schema.graphql': {
      schema: shopifyAdminSchema,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
      documents: ['./src/server/shopify/admin/operations.ts'],
    },
  },
}

export default config
