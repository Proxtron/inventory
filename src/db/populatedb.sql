-- Vehicle Types
INSERT INTO vehicle_type (vehicle_type_name) VALUES
    ('Sedan'),
    ('SUV'),
    ('Truck'),
    ('Coupe'),
    ('Hatchback'),
    ('Van');

-- Makes
INSERT INTO make (make_name) VALUES
    ('Toyota'),
    ('Ford'),
    ('Honda'),
    ('Chevrolet'),
    ('BMW'),
    ('Tesla'),
    ('Jeep'),
    ('Subaru');

-- Models (model_name, vehicle_type_id, make_id)
INSERT INTO model (model_name, vehicle_type_id, make_id) VALUES
    ('Camry',     1, 1),  -- Toyota Sedan
    ('RAV4',      2, 1),  -- Toyota SUV
    ('F-150',     3, 2),  -- Ford Truck
    ('Mustang',   4, 2),  -- Ford Coupe
    ('Civic',     1, 3),  -- Honda Sedan
    ('CR-V',      2, 3),  -- Honda SUV
    ('Tahoe',     2, 4),  -- Chevrolet SUV
    ('Silverado', 3, 4),  -- Chevrolet Truck
    ('X5',        2, 5),  -- BMW SUV
    ('3 Series',  1, 5),  -- BMW Sedan
    ('Model 3',   1, 6),  -- Tesla Sedan
    ('Model Y',   2, 6),  -- Tesla SUV
    ('Wrangler',  2, 7),  -- Jeep SUV
    ('Outback',   2, 8),  -- Subaru SUV
    ('Impreza',   5, 8);  -- Subaru Hatchback

-- Vehicles (year, color, price, model_id)
INSERT INTO vehicle (year, color, price, model_id) VALUES
    (2024, 'Blue',    28500, 1),   -- Toyota Camry
    (2023, 'White',   32000, 2),   -- Toyota RAV4
    (2022, 'Black',   45000, 3),   -- Ford F-150
    (2024, 'Red',     42000, 4),   -- Ford Mustang
    (2023, 'Silver',  24200, 5),   -- Honda Civic
    (2024, 'Gray',    34500, 6),   -- Honda CR-V
    (2021, 'White',   52000, 7),   -- Chevrolet Tahoe
    (2023, 'Black',   48000, 8),   -- Chevrolet Silverado
    (2022, 'Blue',    58000, 9),   -- BMW X5
    (2024, 'White',   46000, 10),  -- BMW 3 Series
    (2024, 'Red',     39000, 11),  -- Tesla Model 3
    (2023, 'Black',   52000, 12),  -- Tesla Model Y
    (2022, 'Green',   38000, 13),  -- Jeep Wrangler
    (2023, 'Blue',    33000, 14),  -- Subaru Outback
    (2024, 'Orange',  24000, 15),  -- Subaru Impreza
    (2020, 'Silver',  48750, 9),   -- BMW X5 (older)
    (2021, 'White',   22000, 5),   -- Honda Civic (older)
    (2024, 'Black',   55000, 3),   -- Ford F-150 (newer)
    (2022, 'Gray',    30000, 1),   -- Toyota Camry (older)
    (2023, 'Red',     35000, 13);  -- Jeep Wrangler
