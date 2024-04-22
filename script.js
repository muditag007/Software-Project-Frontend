const users = [
    { 
        id: 1, 
        name: "Ravi Kumar", 
        email: "ravi@example.com", 
        mobile: "9876543210", 
        dob: "1999-05-15", 
        voted: false 
    },
    { 
        id: 2, 
        name: "Priya Patel", 
        email: "priya@example.com", 
        mobile: "1234567890", 
        dob: "2005-08-25", 
        voted: true 
    }
];

const parties = [
    { id: 1, name: "Party A" },
    { id: 2, name: "Party B" },
    { id: 3, name: "Party C" },
    { id: 4, name: "Party D" },
    { id: 5, name: "Party E" }
];

let currentUser = null;

document.getElementById("scanIdBtn").addEventListener("click", async () => {
    try {
        const userId = parseInt(prompt("Please enter your user ID (integer number):"));
        
        // Fetch user data from backend API
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        print(response.body);
        if (!response.ok) {
            throw new Error('User not found!');
        }
        
        const user = await response.json();

        const age = calculateAge(user.dob);
        if (age < 18) {
            document.getElementById("userIdError").textContent = "You are not eligible to vote (age below 18)!";
            return;
        }

        if (user.voted) {
            document.getElementById("userIdError").textContent = "You have already voted!";
            return;
        }

        // If everything is okay, proceed to show user info
        currentUser = user;
        showUserInfo();
    } catch (error) {
        // Handle errors
        document.getElementById("userIdError").textContent = error.message;
    }
});


// document.getElementById("scanIdBtn").addEventListener("click", () => {
//     const userId = parseInt(prompt("Please enter your user ID (integer number):"));
//     const user = users.find(u => u.id === userId);

//     if (!user) {
//         document.getElementById("userIdError").textContent = "User not found!";
//         return;
//     }

//     const age = calculateAge(user.dob);
//     if (age < 18) {
//         document.getElementById("userIdError").textContent = "You are not eligible to vote (age below 18)!";
//         return;
//     }

//     if (user.voted) {
//         document.getElementById("userIdError").textContent = "You have already voted!";
//         return;
//     }

//     currentUser = user;
//     showUserInfo();
// });

function showUserInfo() {
    document.getElementById("userIdError").textContent = "";
    document.body.innerHTML = `
        <div class="container">
            <h2>Welcome, ${currentUser.name}</h2>
            <h3>User Information:</h3>
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Date of Birth:</strong> ${currentUser.dob}</p>
            <p><strong>Phone Number:</strong> ${currentUser.mobile}</p>
            <h3>Select a party to vote:</h3>
            <ul>
                ${parties.map(party => `
                    <li>
                        <input type="radio" id="party${party.id}" name="party" value="${party.id}">
                        <label for="party${party.id}">${party.name}</label>
                    </li>
                `).join("")}
            </ul>
            <button id="confirmVoteBtn">Confirm Vote</button>
            <div id="voteError" class="error"></div>
        </div>
    `;

    document.getElementById("confirmVoteBtn").addEventListener("click", confirmVote);
}

function confirmVote() {
    const selectedPartyId = parseInt(document.querySelector('input[name="party"]:checked').value);
    const userId = parseInt(prompt("Please enter your user ID to confirm vote:"));

    if (userId !== currentUser.id) {
        document.getElementById("voteError").textContent = "Authentication failed!";
        return;
    }

    currentUser.voted = true;
    document.body.innerHTML = `
        <div class="container">
            <h2>Thank you for voting, ${currentUser.name}!</h2>
        </div>
    `;

    setTimeout(() => {
        window.location.href = "index.html"; // Redirect to home page after 5 seconds
    }, 5000);
}

function calculateAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


