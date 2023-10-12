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
        rs.\`name\` AS 'status_type',
        ur.\`name\` AS 'requestor_name',
        ua.\`name\` AS 'assignee_name',
        r.\`title\`,
        r.\`created_date\`
        FROM request.\`request\` AS r
        LEFT JOIN request.\`request.status\` AS rs ON rs.\`status_id\` = r.\`status_id\`
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
        ur.\`name\` AS 'requestor_name',
        ua.\`name\` AS 'assignee_name',
        r.\`title\`,
        r.\`created_date\`,
        r.\`details\`
        FROM request.\`request\` AS r
        LEFT JOIN request.\`request.status\` AS rs ON rs.\`status_id\` = r.\`status_id\`
        LEFT JOIN request.\`user\` AS ur ON ur.\`user_id\` = r.\`requestor_id\`
        LEFT JOIN request.\`user\` AS ua ON ua.\`user_id\` = r.\`assignee_id\`
        WHERE r.\`request_id\` = ?;`,
        [id]
    );

    return rows[0];
}

// status_id 1 = Open
// requestor_id 2 = Justin Requestor
// assignee_id 1 = Justin Owner
export async function createRequest(title, details) {
    const [rows] = await pool.query(
        `INSERT INTO request.\`request\`
        (\`status_id\`, \`requestor_id\`,\`assignee_id\`, \`title\`,
         \`created_date\`, \`details\`)
        VALUES
        (1, 2, 1, ?, NOW(), ?);`,
        [title, details]
    );

    const requestID = rows.request_id;
    return getRequest(requestID);
}

export async function updateRequestStatus(statusID, requestID) {
    const [rows] = await pool.query(
        `UPDATE request.\`request\`
        SET \`status_id\` = ?
        WHERE \`request_id\` = ?;`,
        [statusID, requestID]
    );

    return rows;
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

export async function getRequestActivityConfig() {
    const [rows] = await pool.query("SELECT * FROM request.`request.activitytype`;");
    return rows;
}

export async function createRequestActivity(requestID, activityTypeID, userID, message) {
    const [rows] = await pool.query(
        `INSERT INTO request.\`request.activity\`
        (\`request_id\`, \`activity_type_id\`,\`user_id\`, \`created_date\`, \`message\`)
        VALUES
        (?, ?, ?, NOW(), ?);`,
        [requestID, activityTypeID, userID, message]
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
