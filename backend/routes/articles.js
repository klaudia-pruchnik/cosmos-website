import { Router } from "express";
import {
  add,
  edit,
  getArticles,
  getArticle,
  deleteArticle,
} from "../data/articles.js";
import { validateArticle } from "../util/validation.js";
import { handleValidationErrors } from "../util/errors.js";
import { checkAuthMiddleware, checkAdminMiddleware } from "../util/auth.js";

const router = Router();

router.post(
  "/articles",
  checkAuthMiddleware,
  checkAdminMiddleware,
  async (req, res, next) => {
    const { article: data } = req.body;
    try {
      const errors = await validateArticle(data, req.app.locals.pool);
      handleValidationErrors(
        errors,
        res,
        "Dodawanie artykułu nie powiodło się z powodu błędów walidacji."
      );

      const createdArticle = await add(data, req.app.locals.pool);
      res
        .status(201)
        .json({ message: "Artykuł dodany do bazy.", article: createdArticle });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/articles/:id",
  checkAuthMiddleware,
  checkAdminMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    const { article: data } = req.body;

    try {
      const errors = await validateArticle(data, req.app.locals.pool);
      handleValidationErrors(
        errors,
        res,
        "Edycja artykułu nie powiodła się z powodu błędów walidacji."
      );

      const updatedArticle = await edit(id, data, req.app.locals.pool);
      res.status(200).json({
        message: "Artykuł został edytowany.",
        article: updatedArticle,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/articles", async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 6;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const articles = await getArticles(limit, offset, req.app.locals.pool);
    res.status(200).json({ articles, hasMore: articles.length === limit });
  } catch (error) {
    next(error);
  }
});

router.get("/articles/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const article = await getArticle(id, req.app.locals.pool);
    if (!article) {
      return res.status(404).json({ message: "Artykuł nie znaleziony." });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/articles/:id",
  checkAuthMiddleware,
  checkAdminMiddleware,
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const article = await getArticle(id, req.app.locals.pool);
      if (!article) {
        return res.status(404).json({ message: "Artykuł nie znaleziony." });
      }

      await deleteArticle(id, req.app.locals.pool);
      res.status(200).json({ message: "Artykuł usunięty." });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
