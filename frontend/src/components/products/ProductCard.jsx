import { memo } from 'react';

import { formatCurrency } from '../../hooks/useStorefront';

const PRODUCT_THEMES = {
  1: {
    badge: 'Audio',
    accent: '#6366F1',
    accentSecondary: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.20), rgba(14,165,233,0.12))',
  },
  2: {
    badge: 'Lighting',
    accent: '#F97316',
    accentSecondary: '#EA580C',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.24), rgba(249,115,22,0.12))',
  },
  3: {
    badge: 'Wearable',
    accent: '#0EA5E9',
    accentSecondary: '#0284C7',
    gradient: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(139,92,246,0.12))',
  },
  4: {
    badge: 'Sound',
    accent: '#38BDF8',
    accentSecondary: '#0EA5E9',
    gradient: 'linear-gradient(135deg, rgba(56,189,248,0.22), rgba(15,23,42,0.14))',
  },
  5: {
    badge: 'Workspace',
    accent: '#F97316',
    accentSecondary: '#EA580C',
    gradient: 'linear-gradient(135deg, rgba(249,115,22,0.18), rgba(244,114,182,0.12))',
  },
  6: {
    badge: 'Ceramics',
    accent: '#C084FC',
    accentSecondary: '#A855F7',
    gradient: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(147,197,253,0.14))',
  },
};

const FALLBACK_IMAGE = '/assets/products/fallback.svg';

const ProductCard = ({
  product,
  cartEntry,
  onAdd,
  onIncrement,
  onDecrement,
  isUpdating,
  isBusy,
}) => {
  const theme = PRODUCT_THEMES[product.id] || {
    badge: 'Featured',
    accent: '#6366F1',
    accentSecondary: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(79,70,229,0.12))',
  };

  const inCart = Boolean(cartEntry);

  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallbackApplied === 'true') return;
    event.currentTarget.dataset.fallbackApplied = 'true';
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <article
      className="product-card"
      style={{
        '--product-accent': theme.accent,
        '--product-accent-secondary': theme.accentSecondary,
        '--product-gradient': theme.gradient,
      }}
    >
      <div className="product-card__badge">{theme.badge}</div>
      <figure className="product-card__media">
        <div className="product-card__glow" aria-hidden="true" />
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={handleImageError}
        />
      </figure>
      <div className="product-card__body">
        <div className="product-card__heading">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-card__footer">
          <div className="product-card__meta">
            <span className="product-card__price-label">Starting at</span>
            <span className="product-card__price">{formatCurrency(product.price)}</span>
            {inCart && (
              <span className="product-card__status" aria-live="polite">
                In cart: {cartEntry.quantity}
          </span>
            )}
          </div>
          <div className="product-card__actions">
            {inCart ? (
              <div className="product-card__cart-controls">
                <div className="product-card__quantity" aria-label={`Update quantity for ${product.name}`}>
                  <button
                    type="button"
                    onClick={() => onDecrement(cartEntry)}
                    disabled={isBusy}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{cartEntry.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onIncrement(cartEntry)}
                    disabled={isBusy}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onAdd(product.id)}
                disabled={isUpdating}
                className="btn btn--primary product-card__cta"
              >
                {isUpdating ? 'Adding…' : 'Add to cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default memo(ProductCard);

