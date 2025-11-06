const AppShell = ({ children }) => (
  <div className="app-shell">
    <div className="app-shell__bg" aria-hidden="true" />
    <div className="app-shell__content">{children}</div>
  </div>
);

export default AppShell;

