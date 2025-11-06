import CartItem from './CartItem';

const CartList = ({ items, onIncrement, onDecrement, onRemove, isProcessing }) => (
  <ul className="cart-list">
    {items.map((item) => (
      <CartItem
        key={item.id}
        item={item}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        isProcessing={isProcessing(item.id)}
      />
    ))}
  </ul>
);

export default CartList;

