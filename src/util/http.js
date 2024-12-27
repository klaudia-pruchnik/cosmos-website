import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function createNewArticle(articleData) {
  const response = await fetch(`http://localhost:8080/articles`, {
    method: "POST",
    body: JSON.stringify(articleData),
    headers: {
      "Content-Type": "application/json",
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
