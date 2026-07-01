const express = require("express");

const app = express();

const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());

app.use("/tickets", ticketRoutes);

const PORT = 3000;

const tickets = require("../data/tickets");

app.get("/", (req, res) => {
    res.send("Welcome to HelpDesk Ticket System API 🚀");
});

app.get("/about", (req, res) => {
    res.send("HelpDesk Ticket System API Version 1.0");
});

app.get("/health", (req, res) => {
    res.send("Server is running successfully ✅");
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});