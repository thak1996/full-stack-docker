import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";
import rideRoutes from "./routes/rideRoutes";

class App {
    public app: express.Application;
    private apiPrefix: string = "/api/v1";

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use((req, res, next) => {
            const currentTime = new Date().toISOString();
            console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
            next();
        });
    }

    private routes(): void {
        this.app.use(`${this.apiPrefix}/message`, messageRoutes);
        this.app.use(`${this.apiPrefix}/ride`, rideRoutes);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default App;
