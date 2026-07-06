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

        displayTickets(tickets);

    } catch (error) {
        console.error("Error loading tickets:", error);
    }
}

// Display Tickets
function displayTickets(tickets) {

    ticketTable.innerHTML = "";

    tickets.forEach((ticket) => {

        ticketTable.innerHTML += `
            <tr>
                <td>${ticket.id}</td>

                <td>${ticket.title}</td>

                <td>
                    <span class="status ${ticket.status.replace(/\s/g, "")}">
                        ${ticket.status}
                    </span>
                </td>

                <td>
                    <span class="priority ${ticket.priority}">
                        ${ticket.priority}
                    </span>
                </td>

                <td>
                    <button class="delete-btn" onclick="deleteTicket(${ticket.id})">
                        🗑️ Delete
                    </button>
                </td>
            </tr>
        `;

    });

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

    if (!confirm("Delete this ticket?")) return;

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

// ======================
// SEARCH TICKETS
// ======================

async function searchTickets() {

    try {

        const keyword = document.getElementById("searchInput").value.trim();

        console.log("Searching:", keyword);

        if (keyword === "") {
            loadTickets();
            return;
        }

        const response = await fetch(`/tickets/search?title=${encodeURIComponent(keyword)}`);

        const tickets = await response.json();

        console.log("Result:", tickets);

        displayTickets(tickets);

    } catch (error) {
        console.error("Search Error:", error);
    }

}



// Initial Load
loadTickets();
loadStats();

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", searchTickets);

});