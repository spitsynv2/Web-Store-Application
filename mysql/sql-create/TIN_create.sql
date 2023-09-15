-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-11-21 01:42:22.535
CREATE SCHEMA IF NOT EXISTS `s22599-tin`;

USE `s22599-tin`;

-- tables
-- Table: Product
CREATE TABLE IF NOT EXISTS Product (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(30) NOT NULL,
    Cena double(30,2) NOT NULL,
    Expiration_date date NOT NULL,
    Type varchar(30) NOT NULL,
    CONSTRAINT Product_pk PRIMARY KEY (Id)
);

-- Table: Supplier
CREATE TABLE IF NOT EXISTS Supplier (
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(30) NOT NULL,
    Country_of_origin varchar(35) NOT NULL,
    International BOOLEAN NOT NULL,
    Delivery_cost double(30,2) Default 0,
    CONSTRAINT Supplier_pk PRIMARY KEY (Id)
);

-- Table: Stored_products
CREATE TABLE IF NOT EXISTS Stored_products (
    Id int NOT NULL AUTO_INCREMENT,
    Product_Id int NOT NULL,
    Supplier_Id int NOT NULL,
    Delivery_date date NOT NULL,
    Total_Cost double(30,2) NOT NULL,
    Perishable BOOLEAN NOT NULL,
    Weight_kg double(30,2) NOT NULL,
    CONSTRAINT Stored_products_pk PRIMARY KEY (Id),
    CONSTRAINT Stored_products_Product FOREIGN KEY Stored_products_Product (Product_Id) REFERENCES Product (Id),
    CONSTRAINT Stored_products_Supplier FOREIGN KEY Stored_products_Supplier (Supplier_Id) REFERENCES Supplier (Id)
);

INSERT IGNORE INTO Product(`Name`,`Cena`,`Expiration_date`,`Type`) VALUES
	('Banany',4.99,'2022-11-21','Owocy'),
	('Apple',1.99,'2022-10-21','Owocy'),
	('PineApple',8.00,'2022-08-21','Owocy')
;

INSERT IGNORE INTO Supplier(`Name`,`Country_of_origin`,`International`,`Delivery_cost`) VALUES
	('UPS','Poland',FALSE,200),
	('ExpertTrack','Ukraine',TRUE,170)
;


INSERT IGNORE INTO Supplier(`Name`,`Country_of_origin`,`International`) VALUES
	('EuroTrack','Spain',TRUE)
;

INSERT IGNORE INTO Stored_products(`Product_Id`,`Supplier_Id`,`Delivery_date`,`Total_Cost`,`Perishable`,`Weight_kg`) VALUES
	(1,1,'2022-10-20',5000,TRUE,1200)
;

-- End of file.

