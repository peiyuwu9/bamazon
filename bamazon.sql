DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(5) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(10) NOT NULL,
    price INT(5) NOT NULL,
    stock_quantity INT(5) NOT NULL,
    sale_quantity INT(5) NOT NULL,
    product_sales INT(5) NOT NULL,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT(5) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INT(10) NOT NULL,
    PRIMARY KEY (department_id )
);

INSERT INTO products
SET product_name = "Television", department_name = "Electronic", price = 499, stock_quantity = 4, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Blender", department_name = "Electronic", price = 299, stock_quantity = 15, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Pillow", department_name = "Bed", price = 99, stock_quantity = 30, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Watch", department_name = "Accessory", price = 89, stock_quantity = 50, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Nike Hat", department_name = "Accessory", price = 29, stock_quantity = 120, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Hoodies", department_name = "Cloth", price = 19, stock_quantity = 150, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Addidas Sneakers", department_name = "Shoe", price = 69, stock_quantity = 80, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Toilet Paper", department_name = "Bath", price = 29, stock_quantity = 200, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Bath Towel", department_name = "Bath", price = 19, stock_quantity = 180, sale_quantity = 0, product_sales = 0;

INSERT INTO products
SET product_name = "Portland Water", department_name = "Grocery", price = 19, stock_quantity = 0, sale_quantity = 0, product_sales = 0;

INSERT INTO departments
SET department_name = "Electronic", over_head_costs = 20000;

INSERT INTO departments
SET department_name = "Bed", over_head_costs = 15000;

INSERT INTO departments
SET department_name = "Accessory", over_head_costs = 5000;

INSERT INTO departments
SET department_name = "Cloth", over_head_costs = 11000;

INSERT INTO departments
SET department_name = "Shoe", over_head_costs = 8000;

INSERT INTO departments
SET department_name = "Bath", over_head_costs = 20000;

INSERT INTO departments
SET department_name = "Grocery", over_head_costs = 9000;

SELECT COUNT(*) products;
SELECT * FROM products;

SELECT COUNT(*) departments;
SELECT * FROM departments;