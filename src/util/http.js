import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

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
    const error = new Error("Wystąpił błąd podczas dodawania artykułu.");
    error.code = response.status;
    error.info = await response.json();
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
