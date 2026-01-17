CREATE DATABASE IF NOT EXISTS fleet;

use fleet;

CREATE TABLE IF NOT EXISTS user (
	user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	last_login DATETIME NOT NULL,
	is_active TINYINT(1) NOT NULL
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS person (
	person_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
	surname VARCHAR(50) NOT NULL,
	date_of_birth DATE NOT NULL,
	phone_number VARCHAR(9) NOT NULL,
	pesel VARCHAR(11) NOT NULL,
	nationality VARCHAR(50) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user (user_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS role (
	role_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
	user_id INT NOT NULL,
	FOREIGN KEY(user_id) REFERENCES user (user_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS vehicle_type (
	vehtype_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	brand VARCHAR(50) NOT NULL,
	model VARCHAR(50) NOT NULL,
	version VARCHAR(50) NOT NULL,
	segment VARCHAR(50) NOT NULL
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS vehicle (
	veh_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	vin VARCHAR(50) NOT NULL,
	registration_number VARCHAR(50) NOT NULL,
	current_mileage VARCHAR(50) NOT NULL,
	production_year VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL,
	vehtype_id INT NOT NULL,
	FOREIGN KEY (vehtype_id) REFERENCES vehicle_type (vehtype_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS reservation (
	res_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	trip_type VARCHAR(50) NOT NULL,
	status VARCHAR(50) NOT NULL,
	start_mileage INT NOT NULL,
	end_mileage INT NOT NULL,
	comments VARCHAR(50) NOT NULL,
	reservation_date VARCHAR(50) NOT NULL,
	planned_departure VARCHAR(50) NOT NULL,
	planned_arrival VARCHAR(50) NOT NULL,
	employee_id INT NOT NULL,
	vehicle_id INT NOT NULL,
	FOREIGN KEY (employee_id) REFERENCES user (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (vehicle_id) REFERENCES vehicle (veh_id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE = INNODB;

LOAD DATA INFILE '/etc/mysql/user.csv'
	INTO TABLE user
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(username,password,last_login,is_active);

LOAD DATA INFILE '/etc/mysql/person.csv'
	INTO TABLE person
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(name,surname,date_of_birth,phone_number,pesel,nationality,user_id);

LOAD DATA INFILE '/etc/mysql/role.csv'
	INTO TABLE role
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(name,user_id);

LOAD DATA INFILE '/etc/mysql/vehicletype.csv'
	INTO TABLE vehicle_type
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(brand,model,version,segment);

LOAD DATA INFILE '/etc/mysql/vehicle.csv'
	INTO TABLE vehicle
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(vin,registration_number,current_mileage,production_year,status,vehtype_id);

LOAD DATA INFILE '/etc/mysql/reservation.csv'
	INTO TABLE reservation
	FIELDS TERMINATED BY ',' ENCLOSED BY '"'
	LINES TERMINATED BY '\n'
	IGNORE 1 ROWS
	(trip_type,status,start_mileage,end_mileage,comments,reservation_date,planned_departure,planned_arrival,employee_id,vehicle_id);
