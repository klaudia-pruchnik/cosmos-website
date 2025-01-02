import { Router } from "express";
import { get } from "../data/user.js";

const router = Router();

router.get("/users/:id/username", async (req, res, next) => {
  const { id } = req.params;

  console.log("getting username for id", id);

  try {
    const user = await get("id", id, req.app.locals.pool);

    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika." });
    }

    res.status(200).json({ username: user.username });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

export default router;
