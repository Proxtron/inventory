import pool from "./pool.js";
import type { Vehicle } from "../types.js";

export const getAllVehicles = async () => {
    const { rows } = await pool.query<Vehicle>(`
        SELECT 
            vehicle.id AS vehicle_id,
            vehicle.year,
            make.make_name,
            model.model_name,
            vehicle_type.vehicle_type_name,
            vehicle.color,
            vehicle.price
        FROM vehicle
            INNER JOIN model
                ON vehicle.model_id = model.id
            INNER JOIN vehicle_type
                ON model.vehicle_type_id = vehicle_type.id
            INNER JOIN make
                ON model.make_id = make.id;
    `)
    return rows;
}