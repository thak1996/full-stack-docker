import { Router } from "express";
import RideController from "../controllers/rideController";

const router = Router();
const rideController = new RideController();

router.post("/estimate", (req, res) => rideController.estimate(req, res));

export default router;
