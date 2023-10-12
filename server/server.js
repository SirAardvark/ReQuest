import express from "express";
import cors from "cors";

// import Database functions.
import * as database from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

// Requests ------------------------------------------------------------------------
app.get("/requests", async (req, res) => {
    const result = await database.getRequests();
    res.send(result);
});

app.get("/requests/:id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getRequest(id);
    res.send(result);
});

app.post("/new_request", async (req, res) => {
    const { title, details } = req.body;
    const note = await database.createRequest(title, details);
    res.status(201).send(note);
});

app.put("/update_request_status/:id", async (req, res) => {
    const id = req.params.id;
    const { statusID } = req.body;
    const note = await database.updateRequestStatus(statusID, id);
    res.status(201).send(note);
});

// Request Status ------------------------------------------------------------------------
app.get("/request_status", async (req, res) => {
    const result = await database.getRequestStatus();
    res.send(result);
});

app.get("/request_status/:id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getRequestStatusName(id);
    res.send(result);
});

// Request Activities ------------------------------------------------------------------------
app.get("/request_activities/:id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getRequestActivities(id);
    res.send(result);
});

app.get("/request_activity_config", async (req, res) => {
    const result = await database.getRequestActivityConfig();
    res.send(result);
});

app.post("/new_request_activity", async (req, res) => {
    const { requestID, activityTypeID, userID, message } = req.body;
    const note = await database.createRequestActivity(requestID, activityTypeID, userID, message);
    res.status(201).send(note);
});

// User ------------------------------------------------------------------------
app.get("/users", async (req, res) => {
    const result = await database.getUsers();
    res.send(result);
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getUser(id);
    res.send(result);
});

app.get("/user_name/id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getUserName(id);
    res.send(result);
});

// User Type ------------------------------------------------------------------------
app.get("/user_roles", async (req, res) => {
    const result = await database.getUserRoles();
    res.send(result);
});

app.get("/user_roles/:id", async (req, res) => {
    const id = req.params.id;
    const result = await database.getUserRoleName(id);
    res.send(result);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
