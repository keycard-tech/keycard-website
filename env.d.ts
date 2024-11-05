declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      SHOPIFY_STORE_DOMAIN: string
      SHOPIFY_STOREFRONT_API_PUBLIC_ACCESS_TOKEN: string
      SHOPIFY_STOREFRONT_API_PRIVATE_ACCESS_TOKEN: string
      SHOPIFY_ADMIN_API_PRIVATE_ACCESS_TOKEN: string
    }
  }
}

export {}
