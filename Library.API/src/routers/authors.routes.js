import { Router } from "express";
import { getAuthors } from "../controllers/authos.controllers.js";

const router = Router();

router.get("/authors", getAuthors);

export default router;