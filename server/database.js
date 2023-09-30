import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Connect to DB
const pool = mysql
    .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
    })
    .promise();

// Requests ------------------------------------------------------------------------
export async function getRequests() {
    const [rows] = await pool.query("SELECT * FROM request.`request`");
    let requests = rows.map(function (row) {
        let values = Object.values(row);

        let requestID = values[0];
        let statusID = getRequestStatusName(values[1]);
        let typeID = getRequestTypeName(values[2]);
        let requestorID = getUserName(values[3]);
        let assigneeID = getUserName(values[4]);
        let title = values[5];
        let lastUpdatedDate = values[6];
        let createdDate = values[7];

        return [
            requestID,
            statusID,
            typeID,
            requestorID,
            assigneeID,
            title,
            lastUpdatedDate,
            createdDate,
        ];
    });
    console.log(requests);
    return rows;
    //   return getNote(id)
}

export async function getRequest(id) {
    const [rows] = await pool.query("SELECT * FROM request.`request` WHERE `request-id` = ?", [id]);
    return rows[0];
}

// Request Status ------------------------------------------------------------------------
export async function getRequestStatus() {
    const [rows] = await pool.query("SELECT * FROM request.`request.status`;");
    return rows;
}

export async function getRequestStatusName(id) {
    const [rows] = await pool.query(
        "SELECT * FROM request.`request.status` WHERE `status-id` = ?",
        [id]
    );
    return rows[0].name;
}

// Request Types ------------------------------------------------------------------------
export async function getRequestTypes() {
    const [rows] = await pool.query("SELECT * FROM request.`request.type`");
    return rows;
}

export async function getRequestTypeName(id) {
    const [rows] = await pool.query("SELECT * FROM request.`request.type` WHERE `type-id` = ?", [
        id,
    ]);
    return rows[0].name;
}

// User ------------------------------------------------------------------------
export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM request.`user`");
    return rows;
}

export async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM request.`user` WHERE `user-id` = ?", [id]);
    return rows[0];
}

export async function getUserName(id) {
    const [rows] = await pool.query("SELECT * FROM request.`user` WHERE `user-id` = ?", [id]);
    return rows[0].name;
}

// User Role ------------------------------------------------------------------------

export async function getUserRoles() {
    const [rows] = await pool.query("SELECT * FROM request.`user.role`");
    return rows;
}

export async function getUserRoleName(id) {
    const [rows] = await pool.query("SELECT * FROM request.`user` WHERE `user-id` = ?", [id]);
    return rows[0].name;
}

// export async function createNote(title, contents) {
//   const [result] = await pool.query(`
//   INSERT INTO notes (title, contents)
//   VALUES (?, ?)
//   `, [title, contents])
//   const id = result.insertId
//   return getNote(id)
// }
