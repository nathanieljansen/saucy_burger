CREATE DATABASE orderStatus_db;
USE orderStatus_db;

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT,
	customerName varchar(255) NOT NULL,
    burgerOption varchar(255) NOT NULL,
    orderPlaced BOOLEAN DEFAULT false,
    cooking BOOLEAN DEFAULT false,
    served BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);