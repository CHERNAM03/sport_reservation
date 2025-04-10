CREATE DATABASE IF NOT EXISTS ${DB_NAME};

-- Use the database
USE sport_reservation;

-- Create the Users table if it does not exist
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'gestionnaire', 'admin') DEFAULT 'admin',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a default user if no users exist in the table
INSERT INTO Users (username, email, password, role, createdAt, updatedAt)
SELECT 'Ameer', 'jean@gmail.com', '$2b$10$hd5iELpmhFNsFyTltGZQDOoEQHDCufYJk9gJ0PyFix./xkUTIAiKC', 'admin', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM Users); 