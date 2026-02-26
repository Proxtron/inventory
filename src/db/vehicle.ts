import pool from "./pool.js";
import { type VehicleType, type AddVehicleParams, type Vehicle } from "../types.js";

export const getAllVehicles = async () => {
    const { rows } = await pool.query<Vehicle>(`
        SELECT 
            vehicle.id AS vehicle_id,
            vehicle.year,
            make.make_name,
            model.model_name,
            vehicle_type.vehicle_type_name,
            vehicle.color,
            vehicle.price,
            vehicle_type.id AS vehicle_type_id,
            make.id AS make_id
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

export const getVehicle = async (vehicleId: number) => {
    const { rows } = await pool.query<Vehicle>(`
        SELECT 
            vehicle.id AS vehicle_id,
            vehicle.year,
            make.make_name,
            model.model_name,
            vehicle_type.vehicle_type_name,
            vehicle.color,
            vehicle.price,
            vehicle_type.id AS vehicle_type_id,
            make.id AS make_id
        FROM vehicle
            INNER JOIN model
                ON vehicle.model_id = model.id
            INNER JOIN vehicle_type
                ON model.vehicle_type_id = vehicle_type.id
            INNER JOIN make
                ON model.make_id = make.id
        WHERE vehicle.id = $1
    `, [vehicleId]);
    return rows;
}

export const getAllVehiclesByMake = async (makeId: number) => {
    const { rows } = await pool.query<Vehicle>(`
        SELECT 
            vehicle.id AS vehicle_id,
            vehicle.year,
            make.make_name,
            model.model_name,
            vehicle_type.vehicle_type_name,
            vehicle.color,
            vehicle.price,
            vehicle_type.id AS vehicle_type_id,
            make.id AS make_id
        FROM vehicle
            INNER JOIN model
                ON vehicle.model_id = model.id
            INNER JOIN vehicle_type
                ON model.vehicle_type_id = vehicle_type.id
            INNER JOIN make
                ON model.make_id = make.id
        WHERE make.id = $1
    `, [makeId]);
    
    return rows;
}

export const getAllVehiclesByType = async (typeId: number) => {
    const { rows } = await pool.query<Vehicle>(`
        SELECT
            vehicle.id AS vehicle_id,
            vehicle.year,
            make.make_name,
            model.model_name,
            vehicle_type.vehicle_type_name,
            vehicle.color,
            vehicle.price,
            vehicle_type.id AS vehicle_type_id,
            make.id AS make_id
        FROM vehicle
            INNER JOIN model
                ON vehicle.model_id = model.id
            INNER JOIN vehicle_type
                ON vehicle_type.id = model.vehicle_type_id
            INNER JOIN make
                ON model.make_id = make.id
        WHERE vehicle_type.id = $1
    `, [typeId]);

    return rows;
}

export const addVehicle = async ({year, color, price, make, model}: AddVehicleParams) => {
    const { rows } = await pool.query<{id: number}>(`
        INSERT INTO vehicle (year, color, price, model_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `, [year, color, price, model])
    return rows[0];
}

export const deleteVehicle = async (vehicleId: number) => {
    await pool.query(`
        DELETE FROM vehicle
        WHERE id = $1
    `, [vehicleId]);
}

export const getAllVehicleTypes = async () => {
    const result = await pool.query<VehicleType>(`
        SELECT id AS vehicle_type_id, vehicle_type_name FROM vehicle_type
    `);

    return result.rows
}