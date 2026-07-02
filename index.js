const express = require("express");
const path = require("path");

const app = express();

const ticketRoutes = require("./routes/ticketRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorHandler");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Create Ticket Page
app.get("/create-ticket", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "create-ticket.html"));
});

// Edit List Page
app.get("/edit-list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "edit-list.html"));
});

// ✅ Edit Ticket Page
app.get("/edit-ticket", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "edit-ticket.html"));
});

// Logger
app.use(loggerMiddleware);

// API Routes
app.use("/tickets", ticketRoutes);

// Extra Routes
app.get("/about", (req, res) => {
    res.send("HelpDesk Ticket System API Version 1.0");
});

app.get("/health", (req, res) => {
    res.send("Server is running successfully ✅");
});

// Error Handler
app.use(errorHandler);

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});