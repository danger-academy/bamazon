-- Drops bamazon db if it currently exists --
DROP DATABASE IF EXISTS bamazon;
-- Creates the bamazon database --
CREATE DATABASE bamazon;

-- Select bamazon database for use by all following code --
USE bamazon;

-- Create "products" table within bamazon --
CREATE TABLE products (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT(11) NOT NULL AUTO_INCREMENT,

  -- Make a string column "products" which cannot be blank --
  product_name VARCHAR(100) NOT NULL,
  
  -- Make a string column "department_name" which cannot be blank --
  department_name VARCHAR(45) DEFAULT NULL,
  
  -- Make a numeric column "price" --
  price DECIMAL(10,2) DEFAULT NULL,
  
   -- Make a numeric column "stock_quantity" --
  stock_quantity INT(100) DEFAULT NULL,
  
  -- Sets id as primary key --
  PRIMARY KEY (id)
);