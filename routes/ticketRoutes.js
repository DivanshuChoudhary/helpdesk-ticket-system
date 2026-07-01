const express = require("express");
const router = express.Router();

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

// GET All Tickets
router.get("/", (req, res) => {
    res.json(tickets);
});

// GET Ticket By ID
router.get("/:id", (req, res) => {

    const ticketId = Number(req.params.id);

    const ticket = tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    res.json(ticket);
});

// POST Ticket
router.post("/", (req, res) => {

    const newTicket = req.body;

    tickets.push(newTicket);

    res.status(201).json({
        message: "Ticket created successfully",
        ticket: newTicket
    });

});

module.exports = router;