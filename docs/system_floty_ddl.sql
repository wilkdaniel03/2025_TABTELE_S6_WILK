CREATE DATABASE IF NOT EXISTS FleetSystem;
USE FleetSystem;


CREATE TABLE Employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(30) NOT NULL, 
    login VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE VehicleType (
    vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    version VARCHAR(50),
    segment VARCHAR(30)
);

CREATE TABLE Vehicle (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vin VARCHAR(17) NOT NULL UNIQUE,
    registration_number VARCHAR(10) NOT NULL UNIQUE, 
    production_year INT,
    current_mileage INT DEFAULT 0,
    status ENUM('Dostepny', 'W_Serwisie', 'Zarezerwowany', 'Wycofany') DEFAULT 'Dostepny',
    vehicle_type_id INT NOT NULL,
    guardian_id INT,
    CONSTRAINT fk_vehicle_type FOREIGN KEY (vehicle_type_id) REFERENCES VehicleType(vehicle_type_id),
    CONSTRAINT fk_vehicle_guardian FOREIGN KEY (guardian_id) REFERENCES Employee(employee_id)
);

CREATE TABLE Reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    planned_start_date DATETIME NOT NULL,
    planned_end_date DATETIME NOT NULL,
    status ENUM('Oczekujaca', 'Zatwierdzona', 'Odrzucona', 'Zakonczona') DEFAULT 'Oczekujaca',
    trip_type ENUM('Sluzbowy', 'Prywatny') NOT NULL,
    start_mileage INT,
    end_mileage INT,
    comments TEXT,
    
    vehicle_id INT NOT NULL,
    employee_id INT NOT NULL,

    CONSTRAINT fk_reservation_vehicle FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id),
    CONSTRAINT fk_reservation_employee FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);
CREATE TABLE ServiceEvent (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(50) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    mileage INT NOT NULL,
    provider VARCHAR(100),
    description TEXT,
    vehicle_id INT NOT NULL,
    reservation_id INT, 
    CONSTRAINT fk_service_vehicle FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id),
    CONSTRAINT fk_service_reservation FOREIGN KEY (reservation_id) REFERENCES Reservation(reservation_id)
);

CREATE TABLE Equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    description VARCHAR(255)
);

CREATE TABLE VehicleEquipment (
    vehicle_id INT NOT NULL,
    equipment_id INT NOT NULL,
    PRIMARY KEY (vehicle_id, equipment_id),
    CONSTRAINT fk_ve_vehicle FOREIGN KEY (vehicle_id) REFERENCES Vehicle(vehicle_id),
    CONSTRAINT fk_ve_equipment FOREIGN KEY (equipment_id) REFERENCES Equipment(equipment_id)
);