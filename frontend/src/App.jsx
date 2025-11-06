import AppShell from './components/layout/AppShell';
import HeroHeader from './components/layout/HeroHeader';
import ProductGrid from './components/products/ProductGrid';
import CartList from './components/cart/CartList';
import CheckoutForm from './components/checkout/CheckoutForm';
import ReceiptModal from './components/modals/ReceiptModal';
import InlineBanner from './components/feedback/InlineBanner';
import LoadingState from './components/feedback/LoadingState';
import EmptyState from './components/feedback/EmptyState';
import useStorefront from './hooks/useStorefront';
import './styles/app.css';

function App() {
  const {
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
  } = useStorefront();

  if (loading) {
    return <LoadingState apiEndpoint={apiBaseUrl} />;
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalLabel = formatCurrency(cartTotal);

  return (
    <AppShell>
      <header className="store-header">
        <div className="store-header__brand">Nexora Market</div>
        <nav className="store-header__nav" aria-label="Primary">
          <a href="#products">Shop</a>
          <a href="#cart">Cart</a>
          <a href="mailto:support@nexora.shop">Support</a>
        </nav>
        <div className="store-header__cart" aria-live="polite">
          <span>{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</span>
          <span className="store-header__total">{cartTotalLabel}</span>
        </div>
      </header>

      <HeroHeader cartQuantity={totalItems} cartTotalLabel={cartTotalLabel} />

      {error && <InlineBanner tone="error" message={error} />}

      <main className="content-grid">
        <section className="section section--products" id="products">
          <div className="section__header">
            <h2>Featured products</h2>
            <p>Shop customer-loved staples ready to ship today.</p>
          </div>
          <ProductGrid
            products={products}
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onIncrement={(item) => handleUpdateQuantity(item, 1)}
            onDecrement={(item) => handleUpdateQuantity(item, -1)}
            actionState={actionState}
            isProcessing={isProcessingItem}
          />
        </section>

        <aside className="section section--cart" id="cart">
          <div className="section__header section__header--compact">
            <h2>Your cart</h2>
            <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
          </div>

          {isCartEmpty ? (
            <EmptyState
              title="Your cart is waiting"
              message="Add the pieces you love and they’ll appear here."
            />
          ) : (
            <CartList
              items={cartItems}
              onIncrement={(item) => handleUpdateQuantity(item, 1)}
              onDecrement={(item) => handleUpdateQuantity(item, -1)}
              onRemove={handleRemoveItem}
              isProcessing={isProcessingItem}
            />
          )}

          <CheckoutForm
            form={checkoutForm}
            onChange={updateCheckoutField}
            onSubmit={handleCheckout}
            total={cartTotal}
            isDisabled={isCartEmpty || isSubmitting}
            isSubmitting={isSubmitting}
          />
        </aside>
      </main>

      {receipt && <ReceiptModal receipt={receipt} onClose={closeReceipt} />}
    </AppShell>
  );
}

export default App;
