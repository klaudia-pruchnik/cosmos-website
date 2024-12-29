import {
  Outlet,
  useLocation,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";

import MainNavigation from "../components/layout/MainNavigation";
import Footer from "../components/layout/Footer";
import { getTokenDuration } from "../util/auth";
import { AuthProvider } from "../context/AuthContext";

function RootLayout() {
  const { hash, pathname } = useLocation();

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  const showFooter = !pathname.startsWith("/auth");

  return (
    <AuthProvider>
      <>
        <MainNavigation />
        <main>
          <Outlet />
        </main>
        {showFooter && <Footer />}
      </>
    </AuthProvider>
  );
}

export default RootLayout;
