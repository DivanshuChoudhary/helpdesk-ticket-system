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

// UPDATE Ticket
const updateTicket = (req, res) => {

    const ticketId = Number(req.params.id);

    const ticket = tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    ticket.title = req.body.title;
    ticket.description = req.body.description;
    ticket.status = req.body.status;
    ticket.priority = req.body.priority;

    res.json({
        message: "Ticket updated successfully",
        ticket
    });

};

// DELETE Ticket
const deleteTicket = (req, res) => {

    const ticketId = Number(req.params.id);

    const ticketIndex = tickets.findIndex(
        (item) => item.id === ticketId
    );

    if (ticketIndex === -1) {
        return res.status(404).json({
            message: "Ticket not found"
        });
    }

    const deletedTicket = tickets.splice(ticketIndex, 1);

    res.json({
        message: "Ticket deleted successfully",
        ticket: deletedTicket[0]
    });

};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};