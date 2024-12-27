import { Router } from "express";
import { add } from "../data/articles.js";
import { isValidText, isValidImageUrl } from "../util/validation.js";

const router = Router();

router.post("/articles", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  console.log(data);

  // validate article >= 2 chars
  if (!isValidText(data.title, 2)) {
    errors.title = "Tytuł artykułu powinien mieć co najmniej 2 znaki.";
  } else {
    console.log("tu bedzie sprawdzenie czy taki artykul juz instnieje");
    // try {
    //   console.log("sprawdzam czy istnieje");
    //   const existingArticle = await get(data.title, req.app.locals.pool); // check if username exists
    //   if (existingArticle) {
    //     errors.title = "Artykuł z takim tytułem już istnieje.";
    //   }
    // } catch (error) {
    //   console.log("errory", error);
    //   next(error); // error capturing
    // }
  }

  // banner url validation
  if (!isValidImageUrl(data.banner_url)) {
    errors.banner_url = "Niepoprawny adres URL.";
  }

  // content validation >= 100 chars
  if (!isValidText(data.content, 100)) {
    errors.content = "Treść artykułu powinna mieć co najmniej 100 znaków.";
  }

  // validation errors
  if (Object.keys(errors).length > 0) {
    console.log("wyspily bledy walidacji");
    return res.status(422).json({
      message: "Dodawanie artykułu nie powiodło się z powodu błędów walidacji.",
      errors,
    });
  }

  try {
    // add user to db
    const createdArticle = await add(data, req.app.locals.pool);

    res.status(201).json({
      message: "Artykuł dodany do bazy.",
      article: createdArticle,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
