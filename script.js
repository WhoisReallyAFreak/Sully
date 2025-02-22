const questions = [
    "Hear them talk dirtier to me",
    "Receive a strip tease or give me a lap dance",
    "Receive a sensual massage",
    "Watch porn together",
    "Take pictures of your partner",
    "Be whipped by them",
    "Wake each other up with morning sex",
    "Have longer teasing and foreplay sessions",
    "Be dominant towards your partner",
    "69 with your partner",
    "Use restraints on them",
    "Have your partner swallow your cum",
    "Use vibrators while having sex",
    "Cum over your partner's face (facial)",
    "Be rougher in sex towards your partner",
    "Have your partner be more vocal",
    "Double penetrate your partner with a toy",
    "Anally penetrate your partner",
    "Have your partner wear stockings and high heels during sex",
    "Watch your partner masturbate",
    "Cum over your partner's breasts/neck (pearl necklace)",
    "Mutually masturbate",
    "Include another male in the bedroom",
    "Have your partner use a butt plug",
    "Blindfold your partner",
    "Be tied down or otherwise restrained",
    "Talk dirtier to your partner",
    "Be shown what your partner likes from porn",
    "Spank your partner with your hand",
    "Be submissive for your partner",
    "Include another female in the bedroom (ménage à trois)",
    "Wear a cock ring (vibrating/non-vibrating) during sex"
];

let user1Answers = [];
let user2Answers = [];

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

function finishUser1() {
    user1Answers = Array.from(document.querySelectorAll('#questions-container input:checked')).map(input => input.value);
    document.getElementById("user1-section").classList.add("hidden");
    document.getElementById("user2-section").classList.remove("hidden");
    createQuestionList("questions-container-2");
}

function finishUser2() {
    user2Answers = Array.from(document.querySelectorAll('#questions-container-2 input:checked')).map(input => input.value);
    document.getElementById("user2-section").classList.add("hidden");
    document.getElementById("results-section").classList.remove("hidden");
    showResults();
}

function showResults() {
    const matchesList = document.getElementById("matches-list");
    matchesList.innerHTML = "";
    let matchCount = 0;

    const user1NahList = document.getElementById("user1-nah");
    const user2NahList = document.getElementById("user2-nah");
    user1NahList.innerHTML = "";
    user2NahList.innerHTML = "";

    questions.forEach((question, index) => {
        if (user1Answers[index] === "Yep" && user2Answers[index] === "Yep") {
            const li = document.createElement("li");
            li.textContent = question;
            matchesList.appendChild(li);
            matchCount++;
        }
        if (user1Answers[index] === "Nah") {
            const li = document.createElement("li");
            li.textContent = question;
            user1NahList.appendChild(li);
        }
        if (user2Answers[index] === "Nah") {
            const li = document.createElement("li");
            li.textContent = question;
            user2NahList.appendChild(li);
        }
    });

    const compatibilityScore = ((matchCount / questions.length) * 100).toFixed(2);
    document.getElementById("compatibility-score").textContent = `Compatibility Score: ${compatibilityScore}%`;
}

createQuestionList("questions-container");
