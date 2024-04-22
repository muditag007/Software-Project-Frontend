const users = {
    1: {
        name: "Rahul Sharma",
        dob: "1992-08-15",
        area: "Delhi",
        mobile: "98765 43210"
    },
    2: {
        name: "Priya Patel",
        dob: "1988-03-20",
        area: "Mumbai",
        mobile: "87654 32109"
    },
    3: {
        name: "Amit Singh",
        dob: "1990-11-05",
        area: "Bangalore",
        mobile: "76543 21098"
    },
    4: {
        name: "Kavita Reddy",
        dob: "1985-06-12",
        area: "Hyderabad",
        mobile: "65432 10987"
    },
    5: {
        name: "Sandeep Kumar",
        dob: "1994-01-25",
        area: "Chennai",
        mobile: "54321 09876"
    }
};

const parties = ["BJP", "INC", "AAP","BSP","NRP"];

let currentUser = null;
let selectedParty = null;

function scanFingerprint() {
    document.getElementById('welcomePage').classList.add('hidden');
    document.getElementById('enterIdPage').classList.remove('hidden');
}

function checkUserId() {
    const userId = parseInt(document.getElementById('userIdInput').value);
    if (userId >= 1 && userId <= 5) {
        currentUser = userId;
        displayUserInfoAndParty();
    } else {
        alert("Invalid user ID.");
    }
}

function displayUserInfoAndParty() {
    const userInfo = users[currentUser];
    const userDetails = `
        <h2>${userInfo.name}</h2>
        <p><strong>Date of Birth:</strong> ${userInfo.dob}</p>
        <p><strong>Area:</strong> ${userInfo.area}</p>
        <p><strong>Mobile:</strong> ${userInfo.mobile}</p>
    `;
    document.getElementById('userDetails').innerHTML = userDetails;

    const partyOptions = parties.map(party => `
        <button class="party-button" onclick="selectParty('${party}')">${party}</button>
    `).join('');
    document.getElementById('votingOptions').innerHTML = partyOptions;

    document.getElementById('enterIdPage').classList.add('hidden');
    document.getElementById('userInfoAndPartyPage').classList.remove('hidden');
}

function selectParty(party) {
    selectedParty = party;
    // Remove 'selected' class from all party buttons
    document.querySelectorAll('.party-button').forEach(button => {
        button.classList.remove('selected');
    });
    // Add 'selected' class to the clicked party button
    event.target.classList.add('selected');
    document.getElementById('confirmPartyButton').classList.remove('hidden');
}

function confirmPartySelection() {
    document.getElementById('userInfoAndPartyPage').classList.add('hidden');
    document.getElementById('confirmIdPage').classList.remove('hidden');
}

function confirmVote() {
    const reEnteredId = parseInt(document.getElementById('confirmUserIdInput').value);
    if (reEnteredId === currentUser) {
        document.getElementById('confirmIdPage').classList.add('hidden');
        document.getElementById('voteResultPage').classList.remove('hidden');
        document.getElementById('voteResultMessage').textContent = "Thank you for voting for ${selectedParty}!";
    } else {
        document.getElementById('confirmIdPage').classList.add('hidden');
        document.getElementById('authFailedPage').classList.remove('hidden');
    }

    // Reset portal after timeout
    setTimeout(() => {
        resetVotingPortal();
    }, 5000);
}

function resetVotingPortal() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById('welcomePage').classList.remove('hidden');
    document.getElementById('userIdInput').value = "";
    document.getElementById('confirmUserIdInput').value = "";
    currentUser = null;
    selectedParty = null;
}