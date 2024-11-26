import { Request, Response } from "express";
import { pool } from "../database";

class TestController {
    public async testConnection(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query("SELECT 1 + 1 AS result");
            const rows = result[0] as any[];
            res.send({
                message: "Database connection is working!",
                result: rows[0].result
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: "Database connection failed" });
        }
    }
}

export default TestController;
