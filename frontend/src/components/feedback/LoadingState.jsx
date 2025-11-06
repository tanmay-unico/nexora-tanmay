const LoadingState = ({ apiEndpoint }) => (
  <div className="loading-screen">
    <div className="loading-screen__card">
      <span className="loading-screen__spinner" aria-hidden="true" />
      <p className="loading-screen__title">Setting the mood…</p>
      <p className="loading-screen__caption">Connecting to {apiEndpoint}</p>
    </div>
  </div>
);

export default LoadingState;

