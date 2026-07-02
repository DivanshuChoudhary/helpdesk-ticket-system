const ticketTable = document.getElementById("ticketTable");

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
        console.error("Error loading tickets:", error);
    }
}

async function deleteTicket(id) {

    const confirmDelete = confirm("Are you sure you want to delete this ticket?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/tickets/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadTickets();

    } catch (error) {
        console.error(error);
    }
}

loadTickets();