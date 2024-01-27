
DROP TABLE IF EXISTS "order";
DROP TABLE IF EXISTS "orderdetail";
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "unit";
DROP TABLE IF EXISTS "user";

CREATE TABLE "unit" (
    unit_id SERIAL PRIMARY KEY,
    unit_name VARCHAR(100)
);

CREATE TABLE "product" (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR,
    price_per INT,
    stock INT,
    unit_id INT,
    CONSTRAINT fk_unit
    FOREIGN KEY (unit_id) REFERENCES unit(unit_id),
    CONSTRAINT check_stock
    CHECK (stock >= 0) 
);

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(100)
);

CREATE TABLE "orderdetail" (
    orderdetail_id SERIAL PRIMARY KEY,
    product_id INT,
    quantity FLOAT,
    price_per INT,
    total_amount INT,
    CONSTRAINT fk_productRef
    FOREIGN KEY (product_id) REFERENCES "product"(product_id)
);

CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    orderdetail_id INT,
    user_id INT,
    order_date DATE,
    CONSTRAINT fk_orderDetailsRef
    FOREIGN KEY (orderdetail_id) REFERENCES orderdetail(orderdetail_id),
    CONSTRAINT fk_userRef
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

INSERT INTO "unit" (unit_id, unit_name) VALUES (1, 'each'), (2, 'kg');

INSERT INTO "user" (name, role) VALUES ('Pratik Rokde', 'admin'), ('Rohit Sharma', 'user'),
('Sachin Sharma', 'user');


INSERT INTO "product" (product_name, price_per, stock, unit_id)
VALUES ('toothpaste', 55, 10, 1),
('brush', 30, 20, 1),
('onion', 70, 100, 2),
('tomato', 90, 25, 2); 

COMMIT;