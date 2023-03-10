import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js"
import ensureAuth from "../middleware/auth.js";

const router = express.Router();

router.get("/admins", ensureAuth, getAdmins)
router.get("/performance/:id", ensureAuth, getUserPerformance)

export default router;