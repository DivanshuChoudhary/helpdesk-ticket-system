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
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading tickets:", error);
    }
}

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
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

loadTickets();