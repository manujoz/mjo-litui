// Avatar Interactive Demo TypeScript
// Esta funcionalidad se carga después de la hidratación del cliente

// Variables globales para el estado
let selectedMembers = new Set<string>();
let selectedUsers = new Set<string>();

// Playground interactions
function changeAvatarProp(prop: string, value: string): void {
    const avatar = document.getElementById("playground-avatar");
    if (!avatar) return;

    if (prop === "name") {
        avatar.setAttribute("name", value || "Interactive Demo");
    } else {
        avatar.setAttribute(prop, value);
    }

    // Update active button states for size
    if (prop === "size") {
        document.querySelectorAll(".control-btn").forEach((btn) => {
            btn.classList.remove("active");
        });
        (event?.target as HTMLElement)?.classList.add("active");
    }
}

function toggleAvatarProp(prop: string): void {
    const avatar = document.getElementById("playground-avatar");
    const checkbox = event?.target as HTMLInputElement;

    if (!avatar || !checkbox) return;

    if (checkbox.checked) {
        avatar.setAttribute(prop, "");
    } else {
        avatar.removeAttribute(prop);
    }
}

// Avatar click feedback
function avatarClick(avatarElement: HTMLElement): void {
    // Add a quick pulse animation
    avatarElement.style.transform = "scale(0.9)";
    setTimeout(() => {
        avatarElement.style.transform = "scale(1.1)";
        setTimeout(() => {
            avatarElement.style.transform = "";
        }, 150);
    }, 100);

    console.log("Avatar clicked:", avatarElement.getAttribute("name"));
}

// Team Dashboard functionality
function selectMember(memberElement: HTMLElement): void {
    const memberId = memberElement.dataset.member || memberElement.querySelector(".member-name")?.textContent || "";

    if (memberElement.classList.contains("selected")) {
        memberElement.classList.remove("selected");
        selectedMembers.delete(memberId);
    } else {
        memberElement.classList.add("selected");
        selectedMembers.add(memberId);
    }

    console.log("Selected team members:", Array.from(selectedMembers));

    // Optional: Show selection feedback
    if (selectedMembers.size > 0) {
        memberElement.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.15)";
    }
}

function addTeamMember(): void {
    const teamGrid = document.getElementById("team-grid");
    if (!teamGrid) return;

    const names = ["Carlos Ruiz", "Sofia Chen", "David Park", "Elena Volkov", "Marcus Johnson"];
    const roles = ["Backend Developer", "Data Analyst", "DevOps Engineer", "QA Specialist", "Mobile Developer"];
    const statuses = ["online", "away", "online", "online", "away"];

    const randomIndex = Math.floor(Math.random() * names.length);
    const initials = names[randomIndex]
        .split(" ")
        .map((n) => n[0])
        .join("");

    const newMember = document.createElement("div");
    newMember.className = "team-member";
    newMember.onclick = () => selectMember(newMember);
    newMember.innerHTML = `
        <mjo-avatar name="${initials}" size="medium" bordered nameColoured></mjo-avatar>
        <div class="member-info">
            <div class="member-name">${names[randomIndex]}</div>
            <div class="member-role">${roles[randomIndex]}</div>
            <div class="member-status ${statuses[randomIndex]}">● ${statuses[randomIndex].charAt(0).toUpperCase() + statuses[randomIndex].slice(1)}</div>
        </div>
    `;

    teamGrid.appendChild(newMember);

    // Animate the new member
    newMember.style.opacity = "0";
    newMember.style.transform = "translateY(20px)";
    setTimeout(() => {
        newMember.style.transition = "all 0.3s ease";
        newMember.style.opacity = "1";
        newMember.style.transform = "translateY(0)";
    }, 50);
}

// Chat functionality
function handleChatInput(event: KeyboardEvent): void {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage(): void {
    const input = document.getElementById("chat-input") as HTMLInputElement;
    const messages = document.getElementById("chat-messages");

    if (!input || !messages || !input.value.trim()) return;

    const messageText = input.value.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const messageElement = document.createElement("div");
    messageElement.className = "message my-message";
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <span class="sender">You</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-text">${messageText}</div>
        </div>
        <mjo-avatar name="YU" size="small" nameColoured class="message-avatar"></mjo-avatar>
    `;

    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
    input.value = "";

    // Simulate a response after a delay
    setTimeout(
        () => {
            simulateResponse(messages);
        },
        1000 + Math.random() * 2000,
    );
}

function simulateResponse(messagesContainer: HTMLElement): void {
    const responses = [
        { name: "JS", sender: "John Smith", text: "Sounds great! I'll take a look." },
        { name: "MG", sender: "María García", text: "Perfect, thanks for the update!" },
        { name: "AL", sender: "Ana López", text: "Let me know if you need any help." },
        { name: "JS", sender: "John Smith", text: "I'll review this and get back to you." },
        { name: "MG", sender: "María García", text: "Excellent work on this feature!" },
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = `
        <mjo-avatar name="${randomResponse.name}" size="small" nameColoured class="message-avatar"></mjo-avatar>
        <div class="message-content">
            <div class="message-header">
                <span class="sender">${randomResponse.sender}</span>
                <span class="timestamp">${timestamp}</span>
            </div>
            <div class="message-text">${randomResponse.text}</div>
        </div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// User selection functionality
function toggleUserSelection(userCard: HTMLElement): void {
    const userId = userCard.dataset.user || "";
    const selectedCountElement = document.getElementById("selected-count");

    if (userCard.classList.contains("selected")) {
        userCard.classList.remove("selected");
        selectedUsers.delete(userId);
    } else {
        userCard.classList.add("selected");
        selectedUsers.add(userId);
    }

    // Update count display
    if (selectedCountElement) {
        const count = selectedUsers.size;
        selectedCountElement.textContent = `${count} selected`;

        if (count > 0) {
            selectedCountElement.style.background = "#dbeafe";
            selectedCountElement.style.color = "#1d4ed8";
        } else {
            selectedCountElement.style.background = "#f3f4f6";
            selectedCountElement.style.color = "#6b7280";
        }
    }

    console.log("Selected users:", Array.from(selectedUsers));
}

// Initialize interactions when the page loads
document.addEventListener("DOMContentLoaded", function () {
    console.log("🎮 Avatar interactive demo loaded!");

    // Set up any additional initialization
    const playgroundAvatar = document.getElementById("playground-avatar");
    if (playgroundAvatar) {
        // Set initial state
        playgroundAvatar.style.transition = "all 0.3s ease";
    }

    // Initialize chat scrolling
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add hover effects to interactive elements
    document.querySelectorAll(".hover-avatar").forEach((avatar) => {
        avatar.addEventListener("mouseenter", function (ev: Event) {
            const target = ev.currentTarget as HTMLElement;
            target.style.filter = "brightness(1.1)";
        });

        avatar.addEventListener("mouseleave", function (ev: Event) {
            const target = ev.currentTarget as HTMLElement;
            target.style.filter = "";
        });
    });
});

window.changeAvatarProp = changeAvatarProp;
window.toggleAvatarProp = toggleAvatarProp;
window.avatarClick = avatarClick;
window.selectMember = selectMember;
window.addTeamMember = addTeamMember;
window.handleChatInput = handleChatInput;
window.sendMessage = sendMessage;
window.toggleUserSelection = toggleUserSelection;
