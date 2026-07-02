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

loadTickets();

const searchInput = document.querySelector(".top-bar input");

searchInput.addEventListener("input", async () => {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        loadTickets();
        return;
    }

    try {
        const response = await fetch(`/tickets/search?title=${searchText}`);
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
        console.error("Search Error:", error);
    }

});