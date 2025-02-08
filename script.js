document.addEventListener("DOMContentLoaded", function () {
    // Logout Functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        window.location.href = "login.html"; // Redirect to login page
    });

    // Create Case Functionality - Opens Blank Modal
    document.getElementById("create-case-btn").addEventListener("click", function () {
        openCaseModal(); // Open modal in blank mode
    });

    // Attach double-click event to existing cases
    document.querySelectorAll("#cases-list tr").forEach(row => {
        row.addEventListener("dblclick", function () {
            openCaseModal(row);
        });
    });
});

// Function to Open Modal (Blank for New Case / Pre-filled for Existing Case)
function openCaseModal(row = null) {
    if (row) {
        // If editing an existing case, pre-fill the modal
        document.getElementById("modal-staff").value = row.cells[0].textContent;
        document.getElementById("modal-mobile").value = row.cells[1].textContent;
        document.getElementById("modal-name").value = row.cells[2].textContent;
        document.getElementById("modal-work").value = row.cells[3].textContent;
        document.getElementById("modal-info").value = row.cells[4].textContent;
        document.getElementById("modal-pending").value = row.cells[5].textContent;
        document.getElementById("modal-remarks").value = row.cells[6].textContent;
        document.getElementById("modal-status").value = row.cells[7].textContent;
    } else {
        // If creating a new case, clear all fields
        document.getElementById("modal-staff").value = "";
        document.getElementById("modal-mobile").value = "";
        document.getElementById("modal-name").value = "";
        document.getElementById("modal-work").value = "";
        document.getElementById("modal-info").value = "";
        document.getElementById("modal-pending").value = "";
        document.getElementById("modal-remarks").value = "";
        document.getElementById("modal-status").value = "Open";
    }

    // Show the modal
    document.getElementById("case-modal").style.display = "flex";

    // Save or Add Case
    document.getElementById("save-case-btn").onclick = function () {
        if (row) {
            // Update Existing Case
            row.cells[0].textContent = document.getElementById("modal-staff").value;
            row.cells[1].textContent = document.getElementById("modal-mobile").value;
            row.cells[2].textContent = document.getElementById("modal-name").value;
            row.cells[3].textContent = document.getElementById("modal-work").value;
            row.cells[4].textContent = document.getElementById("modal-info").value;
            row.cells[5].textContent = document.getElementById("modal-pending").value;
            row.cells[6].textContent = document.getElementById("modal-remarks").value;
            row.cells[7].textContent = document.getElementById("modal-status").value;
        } else {
            // Add New Case to Table
            const table = document.getElementById("cases-list");
            const newRow = table.insertRow(0); // Add at the top

            newRow.innerHTML = `
                <td>${document.getElementById("modal-staff").value}</td>
                <td>${document.getElementById("modal-mobile").value}</td>
                <td>${document.getElementById("modal-name").value}</td>
                <td>${document.getElementById("modal-work").value}</td>
                <td>${document.getElementById("modal-info").value}</td>
                <td>${document.getElementById("modal-pending").value}</td>
                <td>${document.getElementById("modal-remarks").value}</td>
                <td>${document.getElementById("modal-status").value}</td>
            `;

            // Attach double-click event to the new row
            newRow.addEventListener("dblclick", function () {
                openCaseModal(newRow);
            });
        }

        closeModal();
    };
}

// Close Modal Function
function closeModal() {
    document.getElementById("case-modal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById("case-modal");
    if (event.target === modal) {
        closeModal();
    }
};
