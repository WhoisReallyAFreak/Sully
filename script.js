const questions = [
    "Hear them talk dirtier to me", "Receive a strip tease or give me a lap dance", 
    "Receive a sensual massage", "Watch porn together", "Take pictures of your partner", 
    "Judge your partner for a kink or fetish", "Be whipped by them", "Wake each other up with morning sex",
    "Allow your partner a hall pass, or a freebie", "Have longer teasing and foreplay sessions", 
    "Be dominant towards your partner", "69 with your partner", "Use restraints on them", "Buy your partner a coffee", 
    "Have your partner swallow your cum", "Swallow your partners cum with your coffee he bought you", 
    "Use vibrators while having sex", "Cum over your partner's face (facial)", "Watch your partner with someone else", 
    "Be rougher during sex towards your partner", "Have your partner be more vocal", "Watch your partner cum without you", 
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

// Function to save User 1's answers in the URL
function finishUser1() {
    user1Answers = Array.from(document.querySelectorAll('#questions-container input:checked')).map(input => input.value);
    
    // Encode answers into a shareable URL
    const encodedAnswers = encodeURIComponent(JSON.stringify(user1Answers));
    const shareableLink = `${window.location.origin}${window.location.pathname}?user1=${encodedAnswers}`;
    
    // Show the link for User 2
    document.getElementById("share-link").value = shareableLink;
    document.getElementById("user1-section").classList.add("hidden");
    document.getElementById("share-section").classList.remove("hidden");
}

// Function to load User 1's answers from the URL
function loadUser1Answers() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("user1")) {
        document.getElementById("user1-section").classList.add("hidden");
        document.getElementById("user2-section").classList.remove("hidden");
    } else {
        createQuestionList("questions-container");
    }
}

// Function to handle User 2's completion
function finishUser2() {
    user2Answers = Array.from(document.querySelectorAll('#questions-container-2 input:checked')).map(input => input.value);
    document.getElementById("user2-section").classList.add("hidden");
    document.getElementById("results-section").classList.remove("hidden");
    showResults();
}

// Enhanced Function to display results with counseling insights
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
            // Add to matched answers list
            const li = document.createElement("li");
            li.textContent = question;
            matchesList.appendChild(li);
            matchCount++;
        } else {
            // Add to differences list
            const li = document.createElement("li");
            li.innerHTML = `<strong>${question}</strong><br> 
                User 1: ${user1Answers[index] || "No Answer"} <br> 
                User 2: ${user2Answers[index] || "No Answer"}`;
            differencesList.appendChild(li);
        }
    });

    // Calculate compatibility score
    const compatibilityScore = ((matchCount / totalQuestions) * 100).toFixed(2);
    document.getElementById("compatibility-score").textContent = `Compatibility Score: ${compatibilityScore}%`;

    // Add compatibility insights
    const insightTitle = document.createElement("h3");
    insightTitle.textContent = "Relationship Compatibility Insights";
    insightsDiv.appendChild(insightTitle);

    // Generate broad insights
    const insightPara = document.createElement("p");
    if (compatibilityScore >= 80) {
        insightPara.textContent = "You and your partner are highly compatible! Your values, desires, and openness in communication align well. Keep reinforcing these positive aspects through continued communication.";
    } else if (compatibilityScore >= 50) {
        insightPara.textContent = "There are some differences between you two, but that’s completely normal! Open discussions and mutual understanding can help bridge gaps.";
    } else {
        insightPara.textContent = "You have quite a few differences in preferences. Consider having open conversations about your boundaries, values, and expectations to understand each other better.";
    }
    insightsDiv.appendChild(insightPara);

    // Analyze differences and offer insights
    const analysisTitle = document.createElement("h3");
    analysisTitle.textContent = "How to Understand Differences";
    insightsDiv.appendChild(analysisTitle);

    const analysisPara = document.createElement("p");
    analysisPara.textContent = "If you and your partner answered differently on some questions, it might be due to different life experiences, comfort levels, or misunderstandings. Try asking your partner why they feel that way without judgment.";
    insightsDiv.appendChild(analysisPara);
}

// Load User 1's answers if available
document.addEventListener("DOMContentLoaded", loadUser1Answers);
