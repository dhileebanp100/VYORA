const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "VYORA Backend is running successfully!"
    });
});
let requests = [];
let lastAssignment = null; 
let otpRecords={};
let collectionStatuses={};

app.get("/api/requests", (req, res) => {
    res.json(requests);
});
app.post("/api/requests", (req, res) => {
    const request = req.body;

    requests.push(request);

    console.log("New VYORA Collection Request:");
    console.log(request);

    res.status(201).json({
        success: true,
        message: "Collection request received successfully",
        request: request
    });
});
app.post("/api/assign-worker", (req, res) => {

    const assignment = req.body;
    lastAssignment = assignment;

    console.log("Worker Assigned:");
    console.log(assignment);

    res.json({
        success: true,
        message: "Worker assignment received successfully",
        assignment: assignment
    });
});
app.post("/api/verify-otp", (req, res) => {
    const { requestId, otp } = req.body;

    otpRecords[requestId] = {
        otp: otp,
        status: "OTP Verified",
        verifiedAt: new Date().toISOString()
    };

    console.log("OTP Verification:");
    console.log("Request ID:", requestId);
    console.log("OTP:", otp);

    res.json({
        success: true,
        message: "OTP verified and stored successfully",
        requestId: requestId,
        status: "OTP Verified"
    });
});
app.post("/api/collection-status", (req, res) => {
    const { requestId, status } = req.body;

    collectionStatuses[requestId] = {
        status: status,
        updatedAt: new Date().toISOString()
    };

    console.log("Collection Status Updated:");
    console.log("Request ID:", requestId);
    console.log("Status:", status);

    res.json({
        success: true,
        message: "Collection status stored successfully",
        requestId: requestId,
        status: status
    });
});
app.get("/api/assign-worker", (req, res) => {
    res.json({
        success: true,
        assignment: lastAssignment
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`VYORA Backend running on port ${PORT}`);
});