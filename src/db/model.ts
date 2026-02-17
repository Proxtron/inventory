import pool from "./pool.js";
import type { Model } from "../types.js";

export const getAllModels = async () => {
    const { rows } = await pool.query<Model>(`
        SELECT
            model.id,
            model.model_name,
            make.make_name,
            vehicle_type.vehicle_type_name,
            COUNT(*) as vehicle_count
        FROM model
            INNER JOIN make ON make.id = model.make_id
            INNER JOIN vehicle_type ON vehicle_type.id = model.vehicle_type_id
        GROUP BY model.id, model.model_name, make.make_name, vehicle_type.vehicle_type_name
        ORDER BY COUNT(*) DESC
    `)

    return rows;
}