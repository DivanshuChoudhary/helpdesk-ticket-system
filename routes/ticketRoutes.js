const express = require("express");
const router = express.Router();

const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    searchTickets,
    filterTicketsByStatus,
    getTicketStats
} = require("../controllers/ticketController");;

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

router.get("/search", searchTickets);

router.get("/filter", filterTicketsByStatus);

router.get("/stats", getTicketStats);

// GET Ticket By ID
router.get("/:id", getTicketById);

// POST Ticket
router.post("/", validateTicket, createTicket);

router.put("/:id", updateTicket);

router.delete("/:id", deleteTicket);


module.exports = router;