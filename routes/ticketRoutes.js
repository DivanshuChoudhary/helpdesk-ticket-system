const express = require("express");
const router = express.Router();

const {
    getAllTickets,
    getTicketById,
    createTicket
} = require("../controllers/ticketController");

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
router.get("/", getAllTickets);


// GET Ticket By ID
router.get("/:id", getTicketById);

// POST Ticket
router.post("/", createTicket);


module.exports = router;