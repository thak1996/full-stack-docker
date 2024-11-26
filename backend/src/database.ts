import mysql, { RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
    host: "mysql",
    port: 3306,
    user: "root",
    password: "root",
    database: "app_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createDriversTable = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows]: [RowDataPacket[], any] = await connection.query(
            "SHOW TABLES LIKE 'drivers'"
        );
        const tables = rows as RowDataPacket[];
        if (tables.length === 0) {
            await connection.query(`
                CREATE TABLE drivers (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    description TEXT,
                    vehicle VARCHAR(255) NOT NULL,
                    rating DECIMAL(2,1) NOT NULL,
                    comment TEXT,
                    km_tax DECIMAL(10,2) NOT NULL
                )
            `);
            console.log("Table 'drivers' created successfully.");
        } else {
            console.log("Table 'drivers' already exists.");
        }
    } catch (error) {
        console.error("Error creating the 'drivers' table:", error);
    } finally {
        connection.release();
    }
};

export { createDriversTable, pool };
