import dotenv from "dotenv";
import App from "./app";
import { createDriversTable } from "./database";
import { seedDrivers } from "./seeds/driversSeeder";

dotenv.config();

const app = new App();
const PORT = parseInt(process.env.BACKEND_PORT || "8080", 10);

const initializeDatabase = async () => {
    await createDriversTable();
    await seedDrivers();
};

initializeDatabase()
    .then(() => {
        app.start(PORT);
    })
    .catch((error) => {
        console.error("Erro ao inicializar o banco de dados:", error);
    });
