import { Request, Response } from "express";

class HomeController {
    public getHomeMessage(req: Request, res: Response): void {
        res.send({ message: "Hello World" });
    }
}

export default HomeController;
