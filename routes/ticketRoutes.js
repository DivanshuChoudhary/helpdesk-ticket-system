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


// =======================
// 📌 STATIC / SPECIAL ROUTES (IMPORTANT ORDER)
// =======================

// Search Tickets
router.get("/search", searchTickets);

// Filter Tickets
router.get("/filter", filterTicketsByStatus);

// Stats
router.get("/stats", getTicketStats);


// =======================
// 📌 CRUD ROUTES
// =======================

// Get all tickets
router.get("/", getAllTickets);

// Create ticket
router.post("/", validateTicket, createTicket);

// Get single ticket by ID
router.get("/:id", getTicketById);

// Update ticket
router.put("/:id", updateTicket);

// Delete ticket
router.delete("/:id", deleteTicket);


module.exports = router;