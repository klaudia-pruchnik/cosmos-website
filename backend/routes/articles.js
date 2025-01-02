import { Router } from "express";
import { add, getArticles, getArticle } from "../data/articles.js";
import { isValidText, isValidImageUrl } from "../util/validation.js";
import { checkAuthMiddleware, checkAdminMiddleware } from "../util/auth.js";

const router = Router();

router.post(
  "/articles",
  checkAuthMiddleware,
  checkAdminMiddleware,
  async (req, res, next) => {
    const data = req.body.article;
    let errors = {};

    console.log("Dodawanie artykułu");
    console.log(data.title);
    console.log(data);

    console.log("Walidacja danych");
    // validate article >= 2 chars
    if (!isValidText(data.title, 2)) {
      console.log("Tytuł artykułu powinien mieć co najmniej 2 znaki");
      errors.title = "Tytuł artykułu powinien mieć co najmniej 2 znaki.";
    } else {
      console.log("tu bedzie sprawdzenie czy taki artykul juz instnieje");
      // try {
      //   console.log("sprawdzam czy istnieje");
      //   const existingArticle = await get(data.title, req.app.locals.pool);
      //   if (existingArticle) {
      //     errors.title = "Artykuł z takim tytułem już istnieje.";
      //   }
      // } catch (error) {
      //   console.log("errory", error);
      //   next(error); // error capturing
      // }
    }

    // banner url validation
    if (!isValidImageUrl(data.bannerUrl)) {
      console.log("Niepoprawny adres URL.");
      errors.banner_url = "Niepoprawny adres URL.";
    }

    // content validation >= 100 chars
    if (!isValidText(data.content, 100)) {
      console.log("za krotki artykul");
      errors.content = "Treść artykułu powinna mieć co najmniej 100 znaków.";
    }

    // validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Wystapily bledy walidacji");
      return res.status(422).json({
        message:
          "Dodawanie artykułu nie powiodło się z powodu błędów walidacji.",
        errors,
      });
    }

    try {
      const createdArticle = await add(data, req.app.locals.pool);

      res.status(201).json({
        message: "Artykuł dodany do bazy.",
        article: createdArticle,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/articles", async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0;

  console.log("limit, offset", limit, offset);

  try {
    const articles = await getArticles(limit, offset, req.app.locals.pool);

    console.log("articles", articles);
    res.status(200).json({
      articles,
      hasMore: articles.length === limit,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

router.get("/articles/:id", async (req, res, next) => {
  const { id } = req.params;

  console.log("getting article with id", id);

  try {
    const article = await getArticle(id, req.app.locals.pool);

    console.log("fetched article: ", article);
    res.status(200).json(article);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

export default router;
