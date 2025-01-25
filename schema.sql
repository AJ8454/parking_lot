CREATE DATABASE parking_lot;
USE parking_lot;

CREATE TABLE user (
    id integer PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(225) NOT NULL,
    lastName VARCHAR(225) NOT NULL,
    category VARCHAR(225) NOT NULL,
    carNumber TEXT NOT NULL,
    mobileNumber INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE parking (
    id integer PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    parkingNo VARCHAR(50) NOT NULL,
    bookingTime DATETIME NOT NULL,
    isAllocated BOOLEAN NOT NULL DEFAULT FALSE,
    graceTime DATETIME NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);


TRUNCATE TABLE parking;