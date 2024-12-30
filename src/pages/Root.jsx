import {
  Outlet,
  useLocation,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { useEffect, useContext } from "react";

import MainNavigation from "../components/layout/MainNavigation";
import Footer from "../components/layout/Footer";
import { getTokenDuration } from "../util/auth";
import { UserContext } from "../context/UserContext";
import { fetchUserData } from "../util/http";

function RootLayout() {
  const { hash, pathname } = useLocation();
  const { updateUser, clearUser, user } = useContext(UserContext);

  const token = useLoaderData();
  const submit = useSubmit();

  // scrolling to element with id from hash
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  // token menagement and user data fetching
  useEffect(() => {
    if (!token || user) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    // fetch user data
    (async () => {
      const userData = await fetchUserData(token);
      if (userData) {
        updateUser(userData);
      } else {
        clearUser();
      }
    })();

    // logout after token expiration
    const logoutTimer = setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);

    return () => clearTimeout(logoutTimer);
  }, [token, submit]);

  const showFooter = !pathname.startsWith("/auth");

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default RootLayout;
