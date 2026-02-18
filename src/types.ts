export interface Vehicle {
    vehicle_id: number,
    year: number,
    make_name: string,
    model_name: string,
    vehicle_type_name: string,
    color: string,
    price: string,
    vehicle_type_id: number,
    make_id: number
}

export interface Make {
    id: number,
    make_name: string,
    vehicle_count: number
}

export interface Model {
    id: number,
    model_name: string,
    make_name: string,
    vehicle_type_name: string,
    vehicle_count: number
}