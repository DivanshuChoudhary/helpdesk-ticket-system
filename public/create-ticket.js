const ticketForm = document.getElementById("ticketForm");
const submitBtn = document.getElementById("submitBtn");

const params = new URLSearchParams(window.location.search);
const ticketId = params.get("id");

let isEditMode = false;

// -------------------- LOAD TICKET FOR EDIT --------------------
async function loadTicket() {
    if (!ticketId) return;

    isEditMode = true;

    try {
        const response = await fetch(`/tickets/${ticketId}`);
        const ticket = await response.json();

        // form me data fill karo
        document.getElementById("title").value = ticket.title;
        document.getElementById("description").value = ticket.description;
        document.getElementById("status").value = ticket.status;
        document.getElementById("priority").value = ticket.priority;

        submitBtn.innerText = "Update Ticket";

    } catch (error) {
        console.error("Error loading ticket:", error);
        alert("Failed to load ticket data");
    }
}

// -------------------- SUBMIT (CREATE + UPDATE) --------------------
ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTicket = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value
    };

    try {

        let url = "/tickets";
        let method = "POST";

        // EDIT MODE
        if (isEditMode) {
            url = `/tickets/${ticketId}`;
            method = "PUT";
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        });

        if (response.ok) {
            alert(isEditMode ? "✅ Ticket Updated Successfully!" : "✅ Ticket Created Successfully!");
            window.location.href = "/";
        } else {
            alert("❌ Operation failed");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
});

// call load on page open
loadTicket();