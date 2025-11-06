import { formatCurrency } from '../../hooks/useStorefront';

const CheckoutForm = ({
  form,
  onChange,
  onSubmit,
  total,
  isDisabled,
  isSubmitting,
}) => (
  <form className="checkout" onSubmit={onSubmit}>
    <div className="checkout__row">
      <label htmlFor="customer-name">Name</label>
      <input
        id="customer-name"
        type="text"
        value={form.name}
        onChange={(event) => onChange('name', event.target.value)}
        placeholder="Alex Mercer"
        required
      />
    </div>
    <div className="checkout__row">
      <label htmlFor="customer-email">Email</label>
      <input
        id="customer-email"
        type="email"
        value={form.email}
        onChange={(event) => onChange('email', event.target.value)}
        placeholder="alex@vibecommerce.com"
        required
      />
    </div>
    <div className="checkout__summary">
      <span>Total</span>
      <strong>{formatCurrency(total)}</strong>
    </div>
    <button className="btn btn--primary btn--lg" type="submit" disabled={isDisabled}>
      {isSubmitting ? 'Processing…' : 'Complete checkout'}
    </button>
  </form>
);

export default CheckoutForm;

