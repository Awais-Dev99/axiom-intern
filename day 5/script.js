
const container = document.getElementById('departments-container');

const createCardsHTML = (departmentsArray) => {
    return departmentsArray.map(dept => `
            <div class="dept-card" style="border-top: 5px solid ${dept.colour};">
                <div class="dept-logo">${dept.logo}</div>
                <h3 class="dept-name">${dept.name}</h3>
                <p class="dept-desc">${dept.description}</p>
            </div>
        `).join('');
};

const fetchAndRenderDepartments = async () => {
    try {
        const response = await fetch('./departments.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        container.innerHTML = createCardsHTML(data);

    } catch (error) {
        console.error("Failed to fetch departments:", error);

        let errorMessage = "⚠️ Unable to load departments right now. Please try again later.";

        if (!navigator.onLine) {
            errorMessage = "🌐 No Internet Connection. Please check your network cables or Wi-Fi and reload.";
        }

        container.innerHTML = `
            <div id="status-message" class="error">
                ${errorMessage}
            </div>
        `;
    }
};

fetchAndRenderDepartments();
