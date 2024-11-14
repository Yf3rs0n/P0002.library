import express from "express";
import authorRoutes from "./routers/authors.routes.js";
const app = express()
app.use(express.json())
app.use(authorRoutes)
export default app