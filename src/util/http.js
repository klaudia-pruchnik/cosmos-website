import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

export async function fetchArticles({ signal, limit, offset }) {
  let url = "http://localhost:8080/articles";

  if (limit && offset) {
    url += "?limit=" + limit + "&offset=" + offset;
  } else if (limit) {
    url += "?limit=" + limit;
  } else if (offset) {
    url += "?offset=" + offset;
  }

  const response = await fetch(url, { signal: signal });

  console.log("response", response);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching articles");
    error.code = response.status;
    error.info = await response.json();
    console.log("error", error);
    console.log("error.info", error.info);
    throw error;
  }

  return response.json();
}

export async function createNewArticle(articleData) {
  const token = getAuthToken();

  const response = await fetch(`http://localhost:8080/articles`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData);
    const error = new Error(
      errorData.message || "Wystąpił błąd podczas dodawania artykułu."
    );
    error.code = response.status;
    error.info = errorData;
    console.log("error z http info", error.info);
    throw error;
  }

  const { article } = await response.json();

  return article;
}

export async function fetchUserData(token) {
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
