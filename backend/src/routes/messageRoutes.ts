import { Router } from "express";
import MessageController from "../controllers/messageController";

const router = Router();
const messageController = new MessageController();

router.get("/", messageController.getMessage);

export default router;
