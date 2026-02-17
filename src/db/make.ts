import pool from "./pool.js";
import type { Make } from "../types.js";

export const getAllMakes = async () => {
    const { rows } = await pool.query<Make>(`
        SELECT 
            make.id, 
            make_name, 
            COUNT(*) as vehicle_count 
        FROM make 
            INNER JOIN model ON model.make_id = make.id
            INNER JOIN vehicle ON vehicle.model_id = model.id
        GROUP BY make.id, make_name
        ORDER BY COUNT(*) DESC
    `)

    return rows;
}