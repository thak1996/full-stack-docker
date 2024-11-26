import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes";
import testRoutes from "./routes/testRoutes";

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
    }

    private routes(): void {
        this.app.use(`${this.apiPrefix}/message`, messageRoutes);
        this.app.use(`${this.apiPrefix}/test`, testRoutes);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default App;
