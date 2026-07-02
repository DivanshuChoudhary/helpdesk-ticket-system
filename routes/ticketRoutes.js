const express = require("express");
const router = express.Router();

const validateTicket = require("../middleware/validateTicket");

const {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    searchTickets,
    filterTicketsByStatus,
    getTicketStats
} = require("../controllers/ticketController");

// GET All Tickets
router.get("/", getAllTickets);

// Search Tickets
router.get("/search", searchTickets);

// Filter Tickets
router.get("/filter", filterTicketsByStatus);

// Ticket Stats
router.get("/stats", getTicketStats);

// GET Ticket By ID
router.get("/:id", getTicketById);

// Create Ticket
router.post("/", validateTicket, createTicket);

// Update Ticket
router.put("/:id", updateTicket);

// Delete Ticket
router.delete("/:id", deleteTicket);

module.exports = router;