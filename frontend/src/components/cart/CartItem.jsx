import { memo } from 'react';

import { formatCurrency } from '../../hooks/useStorefront';

const CartItem = ({ item, onIncrement, onDecrement, onRemove, isProcessing }) => (
  <li className="cart-item">
    <div className="cart-item__header">
      <span className="cart-item__name">{item.name}</span>
      <span className="cart-item__price">{formatCurrency(item.price)}</span>
    </div>
    <div className="cart-item__footer">
      <div className="quantity-control" aria-label={`Update quantity for ${item.name}`}>
        <button onClick={() => onDecrement(item)} disabled={isProcessing} aria-label="Decrease quantity">
          −
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrement(item)} disabled={isProcessing} aria-label="Increase quantity">
          +
        </button>
      </div>
      <span className="cart-item__total">{formatCurrency(item.lineTotal)}</span>
      <button className="btn btn--ghost" onClick={() => onRemove(item)} disabled={isProcessing}>
        Remove
      </button>
    </div>
  </li>
);

export default memo(CartItem);

