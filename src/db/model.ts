import pool from "./pool.js";
import type { CreateModelParams, Model, ModelTypeCombo } from "../types.js";

export const getAllModels = async () => {
    const { rows } = await pool.query<Model>(`
        SELECT
            model.id,
            model.model_name,
            make.make_name,
            vehicle_type.vehicle_type_name,
            COUNT(vehicle.id) as vehicle_count
        FROM model
            INNER JOIN make ON make.id = model.make_id
            INNER JOIN vehicle_type ON vehicle_type.id = model.vehicle_type_id
            LEFT JOIN vehicle ON vehicle.model_id = model.id
        GROUP BY model.id, model.model_name, make.make_name, vehicle_type.vehicle_type_name
        ORDER BY COUNT(vehicle.id) DESC
    `)

    return rows;
}

export const getAllModelTypeCombos = async () => {
    const { rows } = await pool.query<ModelTypeCombo>(`
        SELECT
            model.id AS model_id,
            model.model_name,
            vehicle_type.id AS vehicle_type_id,
            vehicle_type.vehicle_type_name,
            make.id AS make_id
        FROM model
            INNER JOIN vehicle_type ON vehicle_type.id = model.vehicle_type_id
            INNER JOIN make ON model.make_id = make.id
    `)

    return rows;
}

export const addModel = async ({model, make, vehicle_type}: CreateModelParams) => {
    const queryResult = await pool.query(`
        INSERT INTO model (model_name, vehicle_type_id, make_id)
        VALUES ($1, $2, $3)
    `, [model, vehicle_type, make]);
}