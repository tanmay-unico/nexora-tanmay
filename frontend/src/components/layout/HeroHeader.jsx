const HeroHeader = ({ cartQuantity, cartTotalLabel }) => (
  <section className="hero">
    <div className="hero__content">
      <span className="hero__eyebrow">Just dropped</span>
      <h1 className="hero__title">Upgrade your everyday setup</h1>
      <p className="hero__subtitle">
        Fresh arrivals from our independent makers—desk heroes, cozy ceramics, and audio essentials
        that work as hard as you do.
      </p>
      <div className="hero__actions">
        <a className="btn btn--primary" href="#products">
          Shop the collection
        </a>
        <a className="btn btn--ghost" href="#cart">
          View cart · {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'}
        </a>
        <span className="hero__cart-total">Current total: {cartTotalLabel}</span>
      </div>
    </div>
    <figure className="hero__media">
      <img src="/assets/products/desk.jpg" alt="Workspace with featured products" loading="lazy" />
    </figure>
  </section>
);

export default HeroHeader;

