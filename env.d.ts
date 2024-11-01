declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {
      NEXT_PUBLIC_STORE_DOMAIN: string
      NEXT_PUBLIC_STOREFRONT_API_TOKEN: string
      NEXT_PRIVATE_STOREFRONT_API_TOKEN: string
    }
  }
}
