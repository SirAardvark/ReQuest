import express from "express";

import {
    getRequest,
    getRequests,
    getRequestStatus,
    getRequestStatusName,
    getRequestTypes,
    getRequestTypeName,
} from "./database.js";

const app = express();

app.use(express.json());

// Requests ------------------------------------------------------------------------
app.get("/requests", async (req, res) => {
    const requests = await getRequests();
    res.send(requests);
});

app.get("/requests/:id", async (req, res) => {
    const id = req.params.id;
    const request = await getRequest(id);
    res.send(request);
});

// Request Status ------------------------------------------------------------------------
app.get("/requests-status", async (req, res) => {
    const requestStatus = await getRequestStatus();
    res.send(requestStatus);
});

app.get("/requests-status/:id", async (req, res) => {
    const id = req.params.id;
    const requestStatus = await getRequestStatusName(id);
    res.send(requestStatus);
});

// Request Type ------------------------------------------------------------------------
app.get("/requests-type", async (req, res) => {
    const requestType = await getRequestTypes();
    res.send(requestType);
});

app.get("/requests-type/:id", async (req, res) => {
    const id = req.params.id;
    const requestType = await getRequestTypeName(id);
    res.send(requestType);
});
// User ------------------------------------------------------------------------

// User Type ------------------------------------------------------------------------

// app.post("/notes", async (req, res) => {
//     const { title, contents } = req.body;
//     const note = await createNote(title, contents);
//     res.status(201).send(note);
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
