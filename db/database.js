import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getUsers() {
    const [result] = await pool.query("SELECT * FROM user")
    return result
}

export async function getUserById(id) {
    const [result] = await pool.query(`
        SELECT *
        FROM user
        WHERE id = ?
    `,[id])
    return result[0]
}

export async function getUserByMobileNumber(mobileNumber) {
    const [result] = await pool.query(`
        SELECT *
        FROM user
        WHERE mobileNumber = ?
    `,[mobileNumber])
    return result[0]
}

export async function getUserByCarNumber(carNumber) {
    const [result] = await pool.query(`
        SELECT *
        FROM user
        WHERE carNumber = ?
    `,[carNumber])
    return result[0]
}

export async function createUser(firstName, lastName, category, carNumber, mobileNumber) {
    const [result] = await pool.query(`
        INSERT INTO  user (firstName, lastName, category, carNumber, mobileNumber)
        VALUES (? , ? , ? , ? , ?)
    `,[firstName, lastName, category, carNumber, mobileNumber])
    const id = result.insertId; 
    return await getUserById(id);
}

export async function deleteUser(id) {
   const [result] = await pool.query(
        `DELETE FROM user WHERE id = ? `,
    [id])
    return result;
}

export async function updateuser(id,firstName, lastName, category, carNumber, mobileNumber) {
    await pool.query(`
        UPDATE user SET firstName = ?, lastName = ?, category = ?, carNumber = ?, mobileNumber = ?
        WHERE id = ?
    `,[firstName, lastName, category, carNumber, mobileNumber, id])
    return await getUserById(id);
}

export async function getAllParkings() {
    const [result] = await pool.query("SELECT * FROM parking")
    return result
}


export async function getParkingById(id) {
    const [result] = await pool.query(`
        SELECT *
        FROM user
        WHERE id = ?
    `,[id])
    return result[0]
}

export async function createParking(parkingNo, isAllocated) {
    const [result] = await pool.query(`
        INSERT INTO parking (parkingNo, isAllocated)
        VALUES (? , ?)
    `,[parkingNo, isAllocated])
    const id = result.insertId; 
    return await getParkingById(id);
}
