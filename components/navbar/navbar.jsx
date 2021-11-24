import Link from "next/link";
import NavbarStyles from "./navbar.module.css";
import { useAuth } from "../../auth";
export default function Navbar() {
  const { isSignedIn, signOut, userName } = useAuth();
  let display;
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light position-relative ${NavbarStyles.zIndex}`}
    >
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">FakeStore</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Anasayfa</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/wishlist">
                <a className="nav-link">Favorilerim</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shoppingcard">
                <a className="nav-link">Sepetim</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/orders">
                <a className="nav-link">Siparişlerim</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link">
                {" "}
                {isSignedIn() ? "Hoşgeldiniz " + userName : null}
              </a>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <a className={isSignedIn() ? "d-none" : "nav-link"}>Giriş</a>
              </Link>

              <a
                onClick={() => signOut()}
                className={!isSignedIn() ? "d-none" : "nav-link"}
              >
                Çıkış
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
