const questions = [
    "Hear them talk dirtier to me", "Receive a strip tease or give me a lap dance", 
    "Receive a sensual massage", "Watch porn together", "Take pictures of your partner", 
    "Judge your partner for a kink or fetish", "Be whipped by them", "Wake each other up with morning sex",
    "Allow your partner a hall pass, or a freebie", "Have longer teasing and foreplay sessions", 
    "Be dominant towards your partner", "69 with your partner", "Use restraints on them", "Buy your partner a coffee", 
    "Have your partner swallow your cum", "Swallow your partners cum with your coffee he bought you", 
    "Use vibrators while having sex", "Cum over your partner's face (facial)", "Be rougher during sex towards your partner", "Have your partner be more vocal", "Watch your partner cum without you", 
    "Double penetrate your partner with a toy", "Anally penetrate your partner", "Do you love your partner", 
    "Be shown what partner likes from porn", "Have your partner wear stockings and high heels during sex", 
    "Watch your partner masturbate", "Cum over your partner's breasts/neck (pearl necklace)", "Mutually masturbate", 
    "Go out on a special date with your partner soon", "Include another male in the bedroom", 
    "Have your partner use a butt plug", "Blindfold your partner", "Show your partner what you like from porn", 
    "Film yourselves having sex", "Watch your partner have sex with someone else", 
    "Be tied down or otherwise restrained", "Talk dirtier to your partner", "Be shown what your partner likes from porn", 
    "Spank your partner with your hand", "Do you have any secret fantasies that you think your partner would laugh at you for", 
    "Be submissive for your partner", "Include another female in the bedroom", 
    "Wear a cock ring (vibrating/non-vibrating) during sex", "Does Floobie Doobie Do", 
    "Do you love your partner", "Spend the rest of your life with your partner and grow old"
];

let user1Answers = [];
let user2Answers = [];

// Function to create the question list dynamically
function createQuestionList(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    questions.forEach((question, index) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `
            <p>${question}</p>
            <label><input type="radio" name="q${index}" value="Nah"> Nah</label>
            <label><input type="radio" name="q${index}" value="If your partner wants"> If your partner wants</label>
            <label><input type="radio" name="q${index}" value="Yep"> Yep</label>
        `;
        container.appendChild(div);
    });
}

// Function to save User 1's answers and generate a shareable link
function finishUser1() {
    user1Answers = Array.from(document.querySelectorAll('#questions-container input:checked')).map(input => input.value);
    const encodedAnswers = encodeURIComponent(JSON.stringify(user1Answers));
    const shareableLink = `${window.location.origin}${window.location.pathname}?user1=${encodedAnswers}`;

    document.getElementById("share-link").value = shareableLink;
    document.getElementById("user1-section").classList.add("hidden");
    document.getElementById("share-section").classList.remove("hidden");
}

// Copy link to clipboard
function copyLink() {
    const shareLink = document.getElementById("share-link");
    shareLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
}

// Function to load User 1's answers from URL and show User 2's form
function loadUser1Answers() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("user1")) {
        document.getElementById("user1-section").classList.add("hidden");
        document.getElementById("user2-section").classList.remove("hidden");
        createQuestionList("questions-container-2"); // Create fresh questions for User 2
    } else {
        createQuestionList("questions-container");
    }
}

// Function to handle User 2's submission
function finishUser2() {
    user2Answers = Array.from(document.querySelectorAll('#questions-container-2 input:checked')).map(input => input.value);
    document.getElementById("user2-section").classList.add("hidden");
    document.getElementById("results-section").classList.remove("hidden");
    showResults();
}

// Function to display results
function showResults() {
    const matchesList = document.getElementById("matches-list");
    const differencesList = document.getElementById("differences-list");
    const insightsDiv = document.getElementById("insights");
    
    matchesList.innerHTML = "";
    differencesList.innerHTML = "";
    insightsDiv.innerHTML = "";

    let matchCount = 0;
    let totalQuestions = questions.length;

    questions.forEach((question, index) => {
        if (user1Answers[index] === user2Answers[index]) {
            let li = document.createElement("li");
            li.textContent = `✔️ ${question}`;
            matchesList.appendChild(li);
            matchCount++;
        } else {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${question}</strong><br> 
                User 1: ${user1Answers[index] || "No Answer"} <br> 
                User 2: ${user2Answers[index] || "No Answer"}`;
            differencesList.appendChild(li);
        }
    });

    document.getElementById("compatibility-score").textContent = `Compatibility Score: ${((matchCount / totalQuestions) * 100).toFixed(2)}%`;

    // Add relationship insights
    const insightTitle = document.createElement("h3");
    insightTitle.textContent = "Relationship Compatibility Insights";
    insightsDiv.appendChild(insightTitle);

    const insightPara = document.createElement("p");
    if (matchCount / totalQuestions >= 0.8) {
        insightPara.textContent = "You and your partner are highly compatible! Your values, desires, and openness in communication align well. Keep reinforcing these positive aspects through continued communication.";
    } else if (matchCount / totalQuestions >= 0.5) {
        insightPara.textContent = "There are some differences between you two, but that’s completely normal! Open discussions and mutual understanding can help bridge gaps.";
    } else {
        insightPara.textContent = "You have quite a few differences in preferences. Consider having open conversations about your boundaries, values, and expectations to understand each other better.";
    }
    insightsDiv.appendChild(insightPara);
}

// Function to reset the test for a fresh session
function resetTest() {
    window.location.href = window.location.pathname; // Reload the page without parameters
}

// Load User 1's answers if available
document.addEventListener("DOMContentLoaded", loadUser1Answers);
