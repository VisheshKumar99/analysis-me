import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Navbar />
      <main className="page-shell">{children}</main>
    </>
  );
}
