import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "app_db"
});

const createDriversTable = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS drivers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao TEXT,
                carro VARCHAR(255) NOT NULL,
                avaliacao DECIMAL(2,1) NOT NULL,
                taxa_km DECIMAL(10,2) NOT NULL
            )
        `);
        console.log("Tabela 'drivers' criada ou já existe.");
    } catch (error) {
        console.error("Erro ao criar a tabela 'drivers':", error);
    } finally {
        connection.release();
    }
};

createDriversTable();

export default pool;
