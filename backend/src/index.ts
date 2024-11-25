import dotenv from "dotenv";
import App from "./app";

dotenv.config();

const app = new App();
const PORT = parseInt(process.env.BACKEND_PORT || "8080", 10);

app.start(PORT);
