const params = new URLSearchParams(window.location.search);
const ticketId = params.get("id");

const title = document.getElementById("title");
const description = document.getElementById("description");
const status = document.getElementById("status");
const priority = document.getElementById("priority");
const ticketForm = document.getElementById("ticketForm");

// Load ticket data
async function loadTicket() {
    try {
        const response = await fetch(`/tickets/${ticketId}`);

        if (!response.ok) {
            alert("Ticket not found!");
            return;
        }

        const ticket = await response.json();

        title.value = ticket.title;
        description.value = ticket.description;
        status.value = ticket.status;
        priority.value = ticket.priority;

    } catch (error) {
        console.error(error);
        alert("Error loading ticket.");
    }
}

loadTicket();

// Update ticket
ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedTicket = {
        title: title.value,
        description: description.value,
        status: status.value,
        priority: priority.value
    };

    try {
        const response = await fetch(`/tickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTicket)
        });

        if (!response.ok) {
            alert("Failed to update ticket.");
            return;
        }

        alert("Ticket updated successfully!");

        window.location.href = "/";

    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
});