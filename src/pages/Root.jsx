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

async function fetchUserData(token) {
  try {
    const response = await fetch("http://localhost:8080/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Błąd podczas pobierania danych użytkownika.");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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
    // }, [token, submit, updateUser, clearUser]);
  }, [token, submit]);

  const showFooter = !pathname.startsWith("/auth");

  return (
<<<<<<< HEAD
    <AuthProvider>
      <>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </>
    </AuthProvider>
=======
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
>>>>>>> 8d32c08 (userContext)
  );
}

export default RootLayout;
