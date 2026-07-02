const ticketTable = document.getElementById("ticketTable");

// Dashboard Cards
const totalTickets = document.getElementById("totalTickets");
const openTickets = document.getElementById("openTickets");
const inProgressTickets = document.getElementById("inProgressTickets");
const closedTickets = document.getElementById("closedTickets");

// Load Tickets
async function loadTickets() {
    try {

        const response = await fetch("/tickets");
        const tickets = await response.json();

        ticketTable.innerHTML = "";

        tickets.forEach((ticket) => {

            ticketTable.innerHTML += `
                <tr>
                    <td>${ticket.id}</td>
                    <td>${ticket.title}</td>
                    <td>${ticket.status}</td>
                    <td>${ticket.priority}</td>
                    <td>
                        <button onclick="deleteTicket(${ticket.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {
        console.error(error);
    }
}

// Load Dashboard Stats
async function loadStats() {

    try {

        const response = await fetch("/tickets/stats");
        const stats = await response.json();

        totalTickets.textContent = stats.totalTickets;
        openTickets.textContent = stats.openTickets;
        inProgressTickets.textContent = stats.inProgressTickets;
        closedTickets.textContent = stats.closedTickets;

    } catch (error) {
        console.error(error);
    }

}

// Delete Ticket
async function deleteTicket(id) {

    const confirmDelete = confirm("Delete this ticket?");

    if (!confirmDelete) return;

    try {

        await fetch(`/tickets/${id}`, {
            method: "DELETE"
        });

        loadTickets();
        loadStats();

    } catch (error) {
        console.error(error);
    }

}

loadTickets();
loadStats();