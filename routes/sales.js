import express from "express";
import { getSales } from "../controllers/sales.js"
import ensureAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/sales", ensureAuth, getSales)

export default router;