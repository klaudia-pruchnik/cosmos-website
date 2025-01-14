import { Router } from "express";
import { add, get } from "../data/user.js";
import {
  createJSONToken,
  isValidPassword,
  checkAuthMiddleware,
} from "../util/auth.js";
import { validateSignupData } from "../util/validation.js";
import { handleValidationErrors } from "../util/errors.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;

  try {
    const errors = await validateSignupData(data, req.app.locals.pool);
    if (Object.keys(errors).length > 0) {
      return handleValidationErrors(
        errors,
        res,
        "Rejestracja użytkownika nie powiodła się z powodu błędów walidacji."
      );
    }

    const createdUser = await add(data, req.app.locals.pool);
    const authToken = createJSONToken(createdUser.username);

    res.status(201).json({
      message: "Użytkownik stworzony.",
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await get(username, req.app.locals.pool);
    if (!user || !(await isValidPassword(password, user.password))) {
      return res.status(422).json({
        message: "Autentyfikacja nie powiodła się.",
        errors: { credentials: "Błędna nazwa użytkownika lub hasło." },
      });
    }

    const token = createJSONToken(username);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Wystąpił błąd podczas logowania." });
  }
});

router.get("/user", checkAuthMiddleware, async (req, res) => {
  const username = req.token.username;

  try {
    const user = await get(username, req.app.locals.pool);
    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika." });
    }

    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Wystąpił błąd." });
  }
});

export default router;
