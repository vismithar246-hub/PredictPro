// Actual match results (temporary demo data)
const actualResults = {

    "Brazil vs Argentina": {
        home: 2,
        away: 1
    },

    "France vs Spain": {
        home: 3,
        away: 2
    },

    "Germany vs Portugal": {
        home: 1,
        away: 1
    }

};
// Hero button
const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", function () {
        alert("Welcome to PredictPro!");
    });
}

// Modal elements
const modal = document.getElementById("predictionModal");
const predictButtons = document.querySelectorAll(".predict-btn");
const closeBtn = document.querySelector(".close");
const submitBtn = document.getElementById("submitPrediction");

// Open modal
predictButtons.forEach(button => {

    button.addEventListener("click", function(){

        const card = this.closest(".match-card");

        const home = card.dataset.home;

        const away = card.dataset.away;

        document.getElementById("homeTeamName").textContent = home + " Score";

        document.getElementById("awayTeamName").textContent = away + " Score";

        modal.style.display = "flex";

    });

});

// Close modal
closeBtn.addEventListener("click", function(){

    modal.style.display = "none";

});

// Submit prediction
submitBtn.addEventListener("click", function(){

    const home = document.getElementById("homeScore").value;
    const away = document.getElementById("awayScore").value;

    if(home === "" || away === ""){

        alert("Please enter both scores.");

        return;

    }

    const homeTeam =
document.getElementById("homeTeamName").textContent.replace(" Score","");

const awayTeam =
document.getElementById("awayTeamName").textContent.replace(" Score","");

const prediction = {

    home: homeTeam,

    away: awayTeam,

    homeScore: Number(home),

    awayScore: Number(away),

    status: "Pending",

    points: 0

};
calculateResult(prediction);

let predictions =
JSON.parse(localStorage.getItem("predictions")) || [];

predictions.push(prediction);

localStorage.setItem(

    "predictions",

    JSON.stringify(predictions)

);

loadPredictions();

modal.style.display="none";
document.getElementById("homeScore").value = "";
document.getElementById("awayScore").value = "";

});
function loadPredictions(){

    const body = document.getElementById("predictionBody");

    const predictions =
        JSON.parse(localStorage.getItem("predictions")) || [];

    if(predictions.length === 0){

        body.innerHTML = `
        <tr>
            <td colspan="4">No predictions yet.</td>
        </tr>
        `;

        return;
    }

    body.innerHTML = "";

    predictions.forEach(function(match,index){

        body.innerHTML += `
        <tr>

            <td>${match.home} vs ${match.away}</td>

            <td>${match.homeScore} - ${match.awayScore}</td>

            <td>${match.status}</td>

<td>${match.points}</td>

<td>

<button class="deleteBtn"
onclick="deletePrediction(${index})">

Delete

</button>

</td>

        </tr>
        `;

    });

}

loadPredictions();
function deletePrediction(index){

    let predictions =
    JSON.parse(localStorage.getItem("predictions")) || [];

    predictions.splice(index,1);

    localStorage.setItem(
        "predictions",
        JSON.stringify(predictions)
    );

    loadPredictions();

}
function calculateResult(prediction){

    const key = prediction.home + " vs " + prediction.away;

    const actual = actualResults[key];

    if(!actual){

        prediction.status = "Pending";

        prediction.points = 0;

        return;
    }

    // Exact score
    if(
        prediction.homeScore === actual.home &&
        prediction.awayScore === actual.away
    ){

        prediction.status = "🏆 Exact Match";

        prediction.points = 5;

        return;
    }

    // Winner calculation
    const predictedWinner =
        Math.sign(prediction.homeScore - prediction.awayScore);

    const actualWinner =
        Math.sign(actual.home - actual.away);

    if(predictedWinner === actualWinner){

        prediction.status = "✅ Correct Winner";

        prediction.points = 2;

    }
    else{

        prediction.status = "❌ Wrong Prediction";

        prediction.points = 0;

    }

}