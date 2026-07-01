const express = require("express");

const app = express();

const PORT = 3000;

const tickets = [
    {
        id: 1,
        title: "Internet not working",
        description: "Unable to connect to office WiFi",
        status: "Open",
        priority: "High"
    },
    {
        id: 2,
        title: "Printer issue",
        description: "Printer is not printing documents",
        status: "In Progress",
        priority: "Medium"
    },
    {
        id: 3,
        title: "Email login problem",
        description: "Forgot email password",
        status: "Closed",
        priority: "Low"
    }
];

app.get("/", (req, res) => {
    res.send("Welcome to HelpDesk Ticket System API 🚀");
});

app.get("/about", (req, res) => {
    res.send("HelpDesk Ticket System API Version 1.0");
});

app.get("/health", (req, res) => {
    res.send("Server is running successfully ✅");
});

app.get("/tickets", (req, res) => {
    res.json(tickets);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});