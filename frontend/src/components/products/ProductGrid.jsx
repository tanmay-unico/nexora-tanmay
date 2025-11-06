import ProductCard from './ProductCard';

const ProductGrid = ({
  products,
  cartItems,
  onAdd,
  onIncrement,
  onDecrement,
  actionState,
  isProcessing,
}) => (
  <div className="product-grid">
    {products.map((product) => {
      const cartEntry = cartItems.find((item) => item.productId === product.id);
      return (
        <ProductCard
          key={product.id}
          product={product}
          cartEntry={cartEntry}
          onAdd={onAdd}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          isUpdating={actionState.type === 'add' && actionState.id === product.id}
          isBusy={cartEntry ? isProcessing(cartEntry.id) : false}
        />
      );
    })}
  </div>
);

export default ProductGrid;

