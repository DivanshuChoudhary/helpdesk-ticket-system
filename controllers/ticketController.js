const tickets = require("../data/tickets");

// GET All Tickets
const getAllTickets = (req, res) => {
    res.json(tickets);
};

// GET Ticket By ID
const getTicketById = (req, res) => {

    const ticketId = Number(req.params.id);

    const ticket = tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    res.json(ticket);

};

// CREATE Ticket
const createTicket = (req, res) => {

    const newTicket = req.body;

    tickets.push(newTicket);

    res.status(201).json({
        message: "Ticket created successfully",
        ticket: newTicket
    });

};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket
};