import { formatCurrency } from '../../hooks/useStorefront';

const ReceiptModal = ({ receipt, onClose }) => (
  <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
    <div className="modal__backdrop" aria-hidden="true" />
    <div className="modal__panel" onClick={(event) => event.stopPropagation()}>
      <header className="modal__header">
        <div>
          <h2>Order confirmed</h2>
          <p>Thanks, {receipt.name}. A receipt is on its way to {receipt.email}.</p>
        </div>
        <button className="btn btn--ghost" onClick={onClose} aria-label="Close receipt">
          Close
        </button>
      </header>
      <div className="modal__body">
        <div className="modal__order-meta">
          <span>Order #{receipt.orderId}</span>
          <span>{new Date(receipt.createdAt).toLocaleString()}</span>
        </div>
        <ul>
          {receipt.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="modal__footer">
        <strong>Total {formatCurrency(receipt.total)}</strong>
      </footer>
    </div>
  </div>
);

export default ReceiptModal;

