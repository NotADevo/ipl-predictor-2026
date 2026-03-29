const teamList = ["CSK","MI","RCB","KKR","DC","SRH","PBKS","RR","GT","LSG"];

// points table
let teams = {};
teamList.forEach(t => teams[t] = 0);

// logos
const logos = {
  CSK:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBPskLSBznirS44XLtsL8wyKHm1tW4Inv2iA&s",
  MI:"https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",
  RCB:"https://1000logos.net/wp-content/uploads/2024/03/Royal-Challengers-Bengaluru-Logo.jpg",
  KKR:"https://upload.wikimedia.org/wikipedia/en/4/4c/Kolkata_Knight_Riders_Logo.svg",
  DC:"https://upload.wikimedia.org/wikipedia/en/2/2f/Delhi_Capitals.svg",
  SRH:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqr7e3DARPt-EZtMRQ2lcM37-sgMLJkfLcQ&s",
  PBKS:"https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
  RR:"https://i.pinimg.com/736x/b2/21/ee/b221ee9ae9ecb3fa0f158161ef457e29.jpg",
  GT:"https://upload.wikimedia.org/wikipedia/en/0/09/Gujarat_Titans_Logo.svg",
  LSG:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvaiQcTo5Ew368aDW-4ryWFQESGUQEo6D_g&s"
};

// matches (your full 70 matches)
const matches = [
["RCB","SRH"],["MI","KKR"],["RR","CSK"],["PBKS","GT"],["LSG","DC"],
["KKR","SRH"],["CSK","PBKS"],["DC","MI"],["GT","RR"],["SRH","LSG"],
["RCB","CSK"],["KKR","PBKS"],["RR","MI"],["DC","GT"],["KKR","LSG"],
["RR","RCB"],["PBKS","SRH"],["CSK","DC"],["LSG","GT"],["MI","RCB"],
["SRH","RR"],["CSK","KKR"],["RCB","LSG"],["MI","PBKS"],["GT","KKR"],
["RCB","DC"],["SRH","CSK"],["KKR","RR"],["PBKS","LSG"],["GT","MI"],
["SRH","DC"],["LSG","RR"],["MI","CSK"],["RCB","GT"],["DC","PBKS"],
["RR","SRH"],["GT","CSK"],["LSG","KKR"],["DC","RCB"],["PBKS","RR"],
["MI","SRH"],["GT","RCB"],["RR","DC"],["CSK","MI"],["SRH","KKR"],
["GT","PBKS"],["MI","LSG"],["DC","CSK"],["SRH","PBKS"],["LSG","RCB"],
["DC","KKR"],["RR","GT"],["CSK","LSG"],["RCB","MI"],["PBKS","DC"],
["GT","SRH"],["RCB","KKR"],["PBKS","MI"],["LSG","CSK"],["KKR","GT"],
["PBKS","RCB"],["DC","RR"],["CSK","SRH"],["RR","LSG"],["KKR","MI"],
["CSK","GT"],["SRH","RCB"],["LSG","PBKS"],["MI","RR"],["KKR","DC"]
];

const matchDiv = document.getElementById("matches");

// store selected matches
let selected = {};

// create match cards
matches.forEach((m, i) => {
  const div = document.createElement("div");
  div.className = "match";

  div.innerHTML = `
    <h3>Match ${i+1}</h3>

    <div class="team" id="match-${i}-team1">
      <img src="${logos[m[0]]}">
      ${m[0]}
      <button onclick="pickWinner(${i}, '${m[0]}')">Win</button>
    </div>

    <div class="team" id="match-${i}-team2">
      <img src="${logos[m[1]]}">
      ${m[1]}
      <button onclick="pickWinner(${i}, '${m[1]}')">Win</button>
    </div>
  `;

  matchDiv.appendChild(div);
});

function pickWinner(matchIndex, team) {
  if (selected[matchIndex]) return;

  selected[matchIndex] = team;
  teams[team] += 2;

  const team1 = document.getElementById(`match-${matchIndex}-team1`);
  const team2 = document.getElementById(`match-${matchIndex}-team2`);

  if (team === matches[matchIndex][0]) {
    team1.classList.add("selected");
  } else {
    team2.classList.add("selected");
  }

  updateTable();
}

// update points table
function updateTable() {
  const table = document.getElementById("pointsTable");
  table.innerHTML = "";

  const sorted = Object.entries(teams).sort((a,b) => b[1]-a[1]);

  sorted.forEach(t => {
    table.innerHTML += `<tr><td>${t[0]}</td><td>${t[1]}</td></tr>`;
  });
}

updateTable();