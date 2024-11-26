import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "app_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createDriversTable = async () => {
    const connection = await pool.getConnection();
    try {
        await connection.query("DROP TABLE IF EXISTS drivers");
        await connection.query(`
            CREATE TABLE drivers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                car VARCHAR(255) NOT NULL,
                avaliation DECIMAL(2,1) NOT NULL,
                km_tax DECIMAL(10,2) NOT NULL
            )
        `);
        console.log("Table 'drivers' created successfully.");
    } catch (error) {
        console.error("Error creating the 'drivers' table:", error);
    } finally {
        connection.release();
    }
};

export { createDriversTable, pool };
