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

    const newTicket = {
        id: tickets.length + 1,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority
    };

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

// SEARCH Ticket
const searchTickets = (req, res) => {

    const { title } = req.query;

    const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(title.toLowerCase())
    );

    res.json(filteredTickets);

};

// FILTER Tickets By Status
const filterTicketsByStatus = (req, res) => {

    const { status } = req.query;

    const filteredTickets = tickets.filter((ticket) =>
        ticket.status.toLowerCase() === status.toLowerCase()
    );

    res.json(filteredTickets);

};

// TICKET STATISTICS
const getTicketStats = (req, res) => {

    const totalTickets = tickets.length;

    const openTickets = tickets.filter(ticket => ticket.status === "Open").length;

    const closedTickets = tickets.filter(ticket => ticket.status === "Closed").length;

    const inProgressTickets = tickets.filter(ticket => ticket.status === "In Progress").length;

    res.json({
        totalTickets,
        openTickets,
        closedTickets,
        inProgressTickets
    });

};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    searchTickets,
    filterTicketsByStatus,
    getTicketStats
};