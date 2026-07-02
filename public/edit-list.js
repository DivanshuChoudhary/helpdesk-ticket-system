const table = document.getElementById("editTicketTable");

async function loadTickets() {

    const response = await fetch("/tickets");

    const tickets = await response.json();

    table.innerHTML = "";

    tickets.forEach(ticket => {

        table.innerHTML += `
            <tr>

                <td>${ticket.id}</td>

                <td>${ticket.title}</td>

                <td>${ticket.status}</td>

                <td>${ticket.priority}</td>

                <td>
                    <button onclick="editTicket(${ticket.id})">
                        Edit
                    </button>
                </td>

            </tr>
        `;

    });

}

function editTicket(id) {

    // Open Edit Ticket Page
    window.location.href = `/edit-ticket?id=${id}`;

}

loadTickets();