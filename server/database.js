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
    const [rows] = await pool.query(
        `SELECT r.\`request_id\`,
        rs.\`name\` AS \`status_type\`,
        rt.\`name\` AS \`request_type\`,
        ur.\`name\` AS 'requestor_name',
        ua.\`name\` AS 'assignee_name',
        r.\`title\`,
        r.\`created_date\`
        FROM request.\`request\` AS r
        LEFT JOIN request.\`request.status\` AS rs ON rs.\`status_id\` = r.\`status_id\`
        LEFT JOIN request.\`request.type\` AS rt ON rt.\`type_id\` = r.\`type_id\`
        LEFT JOIN request.\`user\` AS ur ON ur.\`user_id\` = r.\`requestor_id\`
        LEFT JOIN request.\`user\` AS ua ON ua.\`user_id\` = r.\`assignee_id\`
        ORDER BY r.\`request_id\` DESC; 
        `
    );

    return rows;
}

export async function getRequest(id) {
    const [rows] = await pool.query(
        `SELECT r.\`request_id\`,
        rs.\`name\` AS \`status_type\`,
        rt.\`name\` AS \`request_type\`,
        ur.\`name\` AS 'requestor_name',
        ua.\`name\` AS 'assignee_name',
        r.\`title\`,
        r.\`created_date\`,
        r.\`details\`
        FROM request.\`request\` AS r
        LEFT JOIN request.\`request.status\` AS rs ON rs.\`status_id\` = r.\`status_id\`
        LEFT JOIN request.\`request.type\` AS rt ON rt.\`type_id\` = r.\`type_id\`
        LEFT JOIN request.\`user\` AS ur ON ur.\`user_id\` = r.\`requestor_id\`
        LEFT JOIN request.\`user\` AS ua ON ua.\`user_id\` = r.\`assignee_id\`
        WHERE r.\`request_id\` = ?;`,
        [id]
    );

    return rows[0];
}

// Request Status ------------------------------------------------------------------------
export async function getRequestStatus() {
    const [rows] = await pool.query("SELECT * FROM request.`request.status`;");
    return rows;
}

export async function getRequestStatusName(id) {
    const [rows] = await pool.query(
        "SELECT * FROM request.`request.status` WHERE `status_id` = ?",
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
    const [rows] = await pool.query("SELECT * FROM request.`request.type` WHERE `type_id` = ?", [
        id,
    ]);
    return rows[0].name;
}

// Request Activities  ------------------------------------------------------------------------
export async function getRequestActivities(id) {
    const [rows] = await pool.query(
        `SELECT ra.\`request_id\`,
        rat.\`name\` AS \`activity_type\`,
        u.\`name\` AS \`user_name\`,
        ra.\`created_date\`,
        ra.\`message\`
        FROM request.\`request.activity\` AS ra
        LEFT JOIN request.\`request.activitytype\` AS rat ON rat.\`type_id\` = ra.\`activity_type_id\`
        LEFT JOIN request.\`user\` AS u ON u.\`user_id\` = ra.\`user_id\`
        WHERE ra.\`request_id\` = ?
        ORDER BY ra.\`activity_id\` DESC;`,
        [id]
    );
    return rows;
}

// User ------------------------------------------------------------------------
export async function getUsers() {
    const [rows] = await pool.query(
        `SELECT u.\`user_id\`,
        ur.\`name\` AS \`user_role_name\`,
        u.\`name\`,
        u.\`password\`,
        u.\`email\`
        FROM request.\`user\` AS u
        LEFT JOIN request.\`user.role\` AS ur ON ur.\`role_id\` = u.\`role_id\`;`
    );
    return rows;
}

export async function getUser(id) {
    const [rows] = await pool.query(
        `SELECT u.\`user_id\`,
        ur.\`name\` AS \`user_role_name\`,
        u.\`name\`,
        u.\`password\`,
        u.\`email\`
        FROM request.\`user\` AS u
        LEFT JOIN request.\`user.role\` AS ur ON ur.\`role_id\` = u.\`role_id\`
        WHERE u.\`user_id\` = ?;`,
        [id]
    );

    return rows[0];
}

export async function getUserName(id) {
    const [rows] = await pool.query("SELECT * FROM request.`user` WHERE `user_id` = ?", [id]);
    return rows[0].name;
}

// User Role ------------------------------------------------------------------------

export async function getUserRoles() {
    const [rows] = await pool.query("SELECT * FROM request.`user.role`");
    return rows;
}

export async function getUserRoleName(id) {
    const [rows] = await pool.query("SELECT * FROM request.`user` WHERE `user_id` = ?", [id]);
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
