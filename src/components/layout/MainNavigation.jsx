import { NavLink, useRouteLoaderData, Form } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-dark ${classes.mainNavbar}`}
      >
        <NavLink className={`navbar-brand ${classes.mainNavbarBrand}`} to="/">
          COSMOS
        </NavLink>
        {/* <button
          classNameName="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${classes.mainNavItem}`}>
              <NavLink
                className={`nav-link ${classes.mainNavLink} ${({ isActive }) =>
                  isActive ? classes.active : undefined}}`}
                to="/#section-articles"
              >
                Odkryj
              </NavLink>
            </li>
            <li className={`nav-item ${classes.mainNavItem}`}>
              <NavLink
                className={`nav-link ${classes.mainNavLink} ${({ isActive }) =>
                  isActive ? classes.active : undefined}}`}
                to="/about"
              >
                O Nas
              </NavLink>
            </li>
            <li className={`nav-item ${classes.mainNavItem}`}>
              <NavLink
                className={`nav-link ${classes.mainNavLink} ${({ isActive }) =>
                  isActive ? classes.active : undefined}}`}
                to="/"
              >
                Kontakt
              </NavLink>
            </li>
            {!token && (
              <li className={`nav-item ${classes.mainNavItem}`}>
                <NavLink
                  className={`nav-link ${classes.mainNavLink} ${({
                    isActive,
                  }) => (isActive ? classes.active : undefined)}}`}
                  to="/auth?mode=login"
                >
                  Zaloguj się
                </NavLink>
              </li>
            )}
            {token && (
              <li className={`nav-item ${classes.mainNavItem}`}>
                <Form action="/logout" method="post">
                  <button className={`nav-link ${classes.navLinkBtn}`}>
                    Wyloguj się
                  </button>
                </Form>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
