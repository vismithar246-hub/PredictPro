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

    homeScore: home,

    awayScore: away

};

let predictions =
JSON.parse(localStorage.getItem("predictions")) || [];

predictions.push(prediction);

localStorage.setItem(

    "predictions",

    JSON.stringify(predictions)

);

loadPredictions();

modal.style.display="none";

});
function loadPredictions(){

    const container =
    document.getElementById("predictionList");

    const predictions =
    JSON.parse(localStorage.getItem("predictions")) || [];

    if(predictions.length===0){

        container.innerHTML="<p>No predictions yet.</p>";

        return;

    }

    container.innerHTML="";

    predictions.forEach(function(match){

        container.innerHTML += `

        <div class="prediction-item">

        <strong>${match.home}</strong>

        ${match.homeScore}

        -

        ${match.awayScore}

        <strong>${match.away}</strong>

        </div>

        `;

    });

}

loadPredictions();