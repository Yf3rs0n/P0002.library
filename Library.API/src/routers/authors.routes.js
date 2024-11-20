import { Router } from "express";
import { getAuthors,getAuthorsId,postAuthor,deleteAuthor } from "../controllers/authos.controllers.js";

const router = Router();

router.get("/authors", getAuthors);
router.get("/authors/:id", getAuthorsId);
router.post("/authors", postAuthor);
router.delete("/authors/:id", deleteAuthor);




export default router;