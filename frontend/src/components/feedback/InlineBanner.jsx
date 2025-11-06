const InlineBanner = ({ tone = 'neutral', message }) => (
  <div className={`inline-banner inline-banner--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
    <span>{message}</span>
  </div>
);

export default InlineBanner;

