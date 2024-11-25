import { Router } from "express";
import HomeController from "../controllers/homeController";

const router = Router();
const homeController = new HomeController();

router.get("/", homeController.getHomeMessage);

export default router;
