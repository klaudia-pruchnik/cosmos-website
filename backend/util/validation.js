import { getArticleByTitle } from "../data/articles.js";

function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

const validateArticle = async (data, pool) => {
  let errors = {};

  if (!isValidText(data.title, 2)) {
    errors.title = "Tytuł artykułu powinien mieć co najmniej 2 znaki.";
  } else {
    const existingArticle = await getArticleByTitle(data.title, pool);
    if (existingArticle && existingArticle.length > 0) {
      errors.title = "Artykuł z takim tytułem już istnieje.";
    }
  }

  if (!isValidImageUrl(data.bannerUrl)) {
    errors.banner_url = "Niepoprawny adres URL.";
  }

  if (!isValidText(data.content, 100)) {
    errors.content = "Treść artykułu powinna mieć co najmniej 100 znaków.";
  }

  return errors;
};

export const validateSignupData = async (data, pool) => {
  let errors = {};

  // validate username >= 3 chars
  if (!isValidText(data.username, 3)) {
    errors.username = "Nazwa użytkownika powinna mieć co najmniej 3 znaki.";
  } else {
    const existingUser = await get(data.username, pool);
    if (existingUser) {
      errors.username = "Taki użytkownik już istnieje.";
    }
  }

  // password validation > 6 chars
  if (!isValidText(data.password, 6)) {
    errors.password = "Błędne hasło. Powinno mieć co najmniej 6 znaków.";
  }

  return errors;
};

export { isValidText, isValidImageUrl, validateArticle };
