const API_URL = "https://gorest.co.in/public/v2/users";
const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let users = [];

// Fetch users from API
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        users = await response.json();
        renderUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// Render users with pagination
function renderUsers() {
    const tableBody = document.getElementById("userTableBody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.name}</td>
            <td><button onclick="viewUser(${user.id})">View More</button></td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

// Update pagination buttons
function updatePagination() {
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = `Page ${currentPage} of ${Math.ceil(users.length / ITEMS_PER_PAGE)}`;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === Math.ceil(users.length / ITEMS_PER_PAGE);
}

// Handle pagination
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderUsers();
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(users.length / ITEMS_PER_PAGE)) {
        currentPage++;
        renderUsers();
    }
});

// Fetch and display user details along with product details
async function viewUser(userId) {
    try {
        const user = users.find(u => u.id === userId);
        if (!user) return;

        document.getElementById("userName").textContent = user.name;
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userGender").textContent = user.gender;
        document.getElementById("userStatus").textContent = user.status;

        await fetchProductDetails(); // Fetch product details instead of projects

        document.getElementById("userModal").style.display = "block";
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
}

// Fetch product details (replacing projects with product info)
async function fetchProductDetails() {
    const productAPI = "https://fakestoreapi.com/products/1";
    const productList = document.getElementById("userProjects");
    productList.innerHTML = "Loading...";

    try {
        const response = await fetch(productAPI);
        const product = await response.json();
        productList.innerHTML = "";

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Title:</strong> ${product.title} <br>
            <strong>Price:</strong> $${product.price} <br>
            <strong>Description:</strong> ${product.description}
        `;
        productList.appendChild(li);
    } catch (error) {
        console.error("Error fetching product details:", error);
        productList.innerHTML = "<li>Error loading product details</li>";
    }
}

// Close modal
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("userModal").style.display = "none";
});

// Initialize the app
fetchUsers();
