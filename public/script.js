const ticketTable = document.getElementById("ticketTable");

// Dashboard Cards
const totalTickets = document.getElementById("totalTickets");
const openTickets = document.getElementById("openTickets");
const inProgressTickets = document.getElementById("inProgressTickets");
const closedTickets = document.getElementById("closedTickets");

// ========================
// DISPLAY TICKETS
// ========================

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

// ========================
// LOAD TICKETS
// ========================

async function loadTickets() {

    try {

        const response = await fetch("/tickets");

        const tickets = await response.json();

        displayTickets(tickets);

    } catch (error) {

        console.error(error);

    }

}

// ========================
// LOAD DASHBOARD
// ========================

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

// ========================
// DELETE
// ========================

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

// ========================
// SEARCH
// ========================

async function searchTickets() {

    try {

        const keyword = document
            .getElementById("searchInput")
            .value
            .trim();

        if (keyword === "") {

            loadTickets();
            return;

        }

        const response = await fetch(
            `/tickets/search?title=${encodeURIComponent(keyword)}`
        );

        const tickets = await response.json();

        displayTickets(tickets);

    } catch (error) {

        console.error(error);

    }

}

// ========================
// INITIAL LOAD
// ========================

loadTickets();
loadStats();

// ========================
// SEARCH EVENT
// ========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", searchTickets);

}