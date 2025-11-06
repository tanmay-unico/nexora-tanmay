import { useCallback, useEffect, useMemo, useState } from 'react';

import { apiBaseUrl, cartApi, checkoutApi, productApi } from '../services/apiClient';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (value) => currencyFormatter.format(value);

export const useStorefront = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionState, setActionState] = useState({ type: null, id: null });
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCartEmpty = useMemo(() => cartItems.length === 0, [cartItems]);

  const refreshCart = useCallback(async () => {
    const cart = await cartApi.get();
    setCartItems(cart.items);
    setCartTotal(cart.total);
    return cart;
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError('');
        const [catalogue] = await Promise.all([productApi.list(), refreshCart()]);
        setProducts(catalogue);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong while loading the store.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [refreshCart]);

  const handleAddToCart = useCallback(
    async (productId) => {
      try {
        setActionState({ type: 'add', id: productId });
        const existing = cartItems.find((item) => item.productId === productId);
        const nextQty = existing ? existing.quantity + 1 : 1;
        await cartApi.upsert({ productId, quantity: nextQty });
        await refreshCart();
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to update cart.');
      } finally {
        setActionState({ type: null, id: null });
      }
    },
    [cartItems, refreshCart]
  );

  const handleRemoveItem = useCallback(
    async (item) => {
      try {
        setActionState({ type: 'remove', id: item.id });
        await cartApi.remove(item.id);
        await refreshCart();
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to remove item.');
      } finally {
        setActionState({ type: null, id: null });
      }
    },
    [refreshCart]
  );

  const handleUpdateQuantity = useCallback(
    async (item, delta) => {
      const proposedQty = item.quantity + delta;
      if (proposedQty < 1) {
        return handleRemoveItem(item);
      }

      try {
        setActionState({ type: 'update', id: item.id });
        await cartApi.upsert({ productId: item.productId, quantity: proposedQty });
        await refreshCart();
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to adjust quantity.');
      } finally {
        setActionState({ type: null, id: null });
      }
    },
    [handleRemoveItem, refreshCart]
  );

  const handleCheckout = useCallback(
    async (event) => {
      event.preventDefault();
      if (isCartEmpty) return;

      try {
        setIsSubmitting(true);
        setError('');
        const response = await checkoutApi.submit(checkoutForm);
        setReceipt(response);
        setCheckoutForm({ name: '', email: '' });
        await refreshCart();
      } catch (err) {
        console.error(err);
        setError(err.message || 'Checkout failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [checkoutForm, isCartEmpty, refreshCart]
  );

  const updateCheckoutField = useCallback((field, value) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const closeReceipt = useCallback(() => setReceipt(null), []);

  const isProcessingItem = useCallback(
    (itemId) => actionState.id === itemId && ['update', 'remove'].includes(actionState.type),
    [actionState]
  );

  return {
    apiBaseUrl,
    products,
    cartItems,
    cartTotal,
    loading,
    error,
    isSubmitting,
    receipt,
    checkoutForm,
    isCartEmpty,
    actionState,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    updateCheckoutField,
    closeReceipt,
    isProcessingItem,
    formatCurrency,
  };
};

export default useStorefront;

