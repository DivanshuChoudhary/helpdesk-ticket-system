const ticketForm = document.getElementById("ticketForm");

ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ticket = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        status: document.getElementById("status").value,
        priority: document.getElementById("priority").value
    };

    try {

        const response = await fetch("/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });

        if (response.ok) {
            alert("✅ Ticket Created Successfully!");
            window.location.href = "/";
        } else {
            alert("❌ Failed to create ticket");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }

});