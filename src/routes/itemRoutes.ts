import { Router } from "express";
import { AddItem } from "../controllers/itemController";

const router = Router();

router.post('/', AddItem);

export default router;