import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import RootLayout from "./pages/Root.jsx";
import ArticlePage from "./pages/Article.jsx";
import AuthPage from "./pages/Auth.jsx";
import AddNewArticle from "./pages/AddNewArticle.jsx";

import { action as authAction } from "./pages/Auth";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: tokenLoader,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "articles",
        children: [
          {
            index: true,
            element: <Navigate to="/#section-articles" />,
          },
          {
            path: ":articleId",
            id: "article",
            children: [
              {
                index: true,
                element: <ArticlePage />,
              },
            ],
          },
          { path: "new", element: <AddNewArticle /> },
        ],
      },
      { path: "auth", element: <AuthPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
