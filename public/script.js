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

                    <td>
                        <span class="status ${ticket.status.replace(/\s/g, '')}">
                            ${ticket.status}
                        </span>
                    </td>

                    <td>
                        <span class="priority ${ticket.priority}">
                            ${ticket.priority}
                        </span>
                    </td>

                    <td>
                        <button class="edit-btn" onclick="editTicket(${ticket.id})">
                            ✏️ Edit
                        </button>

                        <button class="delete-btn" onclick="deleteTicket(${ticket.id})">
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading tickets:", error);
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
        console.error("Error loading stats:", error);
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

// Edit Ticket
function editTicket(id) {
    window.location.href = `/edit-ticket?id=${id}`;
}

loadTickets();
loadStats();