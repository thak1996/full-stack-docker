import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes";
import testRoutes from "./routes/testRoutes";

class App {
    public app: express.Application;

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
        this.app.use("/home", homeRoutes);
        this.app.use("/", testRoutes);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

export default App;
