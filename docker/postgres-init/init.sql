-- Table : User
CREATE TABLE "User" (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    phone_number VARCHAR(15),
    birthday_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR
);

-- Table : Restaurant
CREATE TABLE Restaurant (
    restaurant_id UUID PRIMARY KEY,
    owner_restaurant UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    name VARCHAR,
    email VARCHAR,
    phone_number VARCHAR(15),
    address VARCHAR,
    open_hour VARCHAR,
    close_hour VARCHAR
);

-- Table : Menu
CREATE TABLE Menu (
    menu_id VARCHAR PRIMARY KEY,
    restaurant_id UUID REFERENCES Restaurant(restaurant_id) ON DELETE CASCADE,
    price DECIMAL,
    photo TEXT
);

-- Table : Item
CREATE TABLE Item (
    item_id VARCHAR PRIMARY KEY,
    restaurant_id UUID REFERENCES Restaurant(restaurant_id) ON DELETE CASCADE,
    name VARCHAR,
    price DECIMAL,
    description VARCHAR,
    ingredients VARCHAR,
    photo TEXT
);

-- Table : Order
CREATE TABLE "Order" (
    order_id UUID PRIMARY KEY,
    client_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    delivery_address VARCHAR,
    pay_status BOOLEAN
);

-- Table : Delivery
CREATE TABLE Delivery (
    delivery_id UUID PRIMARY KEY,
    order_id UUID REFERENCES "Order"(order_id) ON DELETE CASCADE,
    driver_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    status VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    qr_code TEXT
);

-- Table de liaison : Order-Menu
CREATE TABLE "Order-Menu" (
    order_id UUID REFERENCES "Order"(order_id) ON DELETE CASCADE,
    menu_id VARCHAR REFERENCES Menu(menu_id) ON DELETE CASCADE,
    PRIMARY KEY (order_id, menu_id)
);

-- Table de liaison : Menu-Item
CREATE TABLE "Menu-Item" (
    menu_id VARCHAR REFERENCES Menu(menu_id) ON DELETE CASCADE,
    item_id VARCHAR REFERENCES Item(item_id) ON DELETE CASCADE,
    PRIMARY KEY (menu_id, item_id)
);

-- Table : User
CREATE TABLE "User" (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR UNIQUE,
    password VARCHAR,
    phone_number VARCHAR(15),
    birthday_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR
);

-- Table : Restaurant
CREATE TABLE Restaurant (
    restaurant_id UUID PRIMARY KEY,
    owner_restaurant UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    name VARCHAR,
    email VARCHAR,
    phone_number VARCHAR(15),
    adress VARCHAR,
    open_hour VARCHAR,
    close_hour VARCHAR
);

-- Table : Menu
CREATE TABLE Menu (
    menu_id VARCHAR PRIMARY KEY,
    restaurant_id UUID REFERENCES Restaurant(restaurant_id) ON DELETE CASCADE,
    price DECIMAL,
    photo TEXT
);

-- Table : Item
CREATE TABLE Item (
    item_id VARCHAR PRIMARY KEY,
    restaurant_id UUID REFERENCES Restaurant(restaurant_id) ON DELETE CASCADE,
    name VARCHAR,
    price DECIMAL,
    description VARCHAR,
    ingredients VARCHAR,
    photo TEXT
);

-- Table : Order
CREATE TABLE "Order" (
    order_id UUID PRIMARY KEY,
    client_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    delivery_address VARCHAR,
    pay_status BOOLEAN
);

-- Table : Delivery
CREATE TABLE Delivery (
    delivery_id UUID PRIMARY KEY,
    order_id UUID REFERENCES "Order"(order_id) ON DELETE CASCADE,
    driver_id UUID REFERENCES "User"(user_id) ON DELETE SET NULL,
    status VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    qr_code TEXT
);

-- Table de liaison : Order-Menu
CREATE TABLE "Order-Menu" (
    order_id UUID REFERENCES "Order"(order_id) ON DELETE CASCADE,
    menu_id VARCHAR REFERENCES Menu(menu_id) ON DELETE CASCADE,
    PRIMARY KEY (order_id, menu_id)
);

-- Table de liaison : Menu-Item
CREATE TABLE "Menu-Item" (
    menu_id VARCHAR REFERENCES Menu(menu_id) ON DELETE CASCADE,
    item_id VARCHAR REFERENCES Item(item_id) ON DELETE CASCADE,
    PRIMARY KEY (menu_id, item_id)
);