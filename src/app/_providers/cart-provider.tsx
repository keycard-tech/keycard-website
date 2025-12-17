'use client'

import {
  addVariantToCart,
  Cart,
  fetchCart,
  getOrCreateCart,
  removeLine,
  updateLine,
} from '~/lib/sharedCart'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type CartContextValue = {
  cart: Cart | null
  isDrawerOpen: boolean
  isLoading: boolean
  isMutating: boolean
  error: string | null
  openDrawer: () => void
  closeDrawer: () => void
  refreshCart: () => Promise<void>
  addItem: (variantGid: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

type Props = {
  children: React.ReactNode
}

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMutating, setIsMutating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const hydrate = async () => {
      try {
        const nextCart = await getOrCreateCart()
        if (!cancelled) {
          setCart(nextCart)
          setError(null)
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error ? error.message : 'Failed to load cart',
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void hydrate()

    return () => {
      cancelled = true
    }
  }, [])

  const refreshCart = useCallback(async () => {
    setIsMutating(true)
    try {
      const nextCart = await fetchCart()
      setCart(nextCart)
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to refresh cart',
      )
    } finally {
      setIsMutating(false)
      setIsLoading(false)
    }
  }, [])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  const addItem = useCallback(async (variantGid: string, quantity = 1) => {
    setIsMutating(true)
    try {
      const nextCart = await addVariantToCart(variantGid, quantity)
      setCart(nextCart)
      setError(null)
      setIsDrawerOpen(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to add item')
      throw error
    } finally {
      setIsMutating(false)
      setIsLoading(false)
    }
  }, [])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    setIsMutating(true)
    try {
      const nextCart = await updateLine(lineId, quantity)
      setCart(nextCart)
      setError(null)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Unable to update quantity',
      )
    } finally {
      setIsMutating(false)
      setIsLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (lineId: string) => {
    setIsMutating(true)
    try {
      const nextCart = await removeLine(lineId)
      setCart(nextCart)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to remove item')
    } finally {
      setIsMutating(false)
      setIsLoading(false)
    }
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isDrawerOpen,
      isLoading,
      isMutating,
      error,
      openDrawer,
      closeDrawer,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
    }),
    [
      cart,
      isDrawerOpen,
      isLoading,
      isMutating,
      error,
      openDrawer,
      closeDrawer,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
