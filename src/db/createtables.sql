CREATE TABLE vehicle_type (
    id SERIAL PRIMARY KEY,
    vehicle_type_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE make (
    id SERIAL PRIMARY KEY,
    make_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE model (
    id SERIAL PRIMARY KEY,
    model_name VARCHAR(50) NOT NULL,
    vehicle_type_id INTEGER NOT NULL REFERENCES vehicle_type(id),
    make_id INTEGER NOT NULL REFERENCES make(id),
    UNIQUE(model_name, make_id)
);

CREATE TABLE vehicle (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    color VARCHAR(20) NOT NULL,
    price MONEY NOT NULL,
    model_id INTEGER NOT NULL REFERENCES model(id)
);