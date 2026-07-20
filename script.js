// Initialize ongoing scores
let scores = { user: 0, tie: 0, comp: 0 };
let matchCount = 0;

function getComputerChoice() {
  let randomNumber = Math.random() * 3;
  if (randomNumber > 0 && randomNumber <= 1) {
    return 'Bat';
  } else if (randomNumber > 1 && randomNumber <= 2) {
    return 'Ball';
  } else {
    return 'Stump';
  }
}

function playRound(userChoice) {
  let computerChoice = getComputerChoice();
  let resultMesg = '';
  let statusClass = '';

  // Game Logic
  if (userChoice === computerChoice) {
    resultMesg = "It's a Tie!";
    statusClass = 'tie';
    scores.tie++;
  } else if (
    (userChoice === 'Bat' && computerChoice === 'Ball') ||
    (userChoice === 'Ball' && computerChoice === 'Stump') ||
    (userChoice === 'Stump' && computerChoice === 'Bat')
  ) {
    resultMesg = 'You Won!';
    statusClass = 'win';
    scores.user++;
  } else {
    resultMesg = 'Computer Won!';
    statusClass = 'loss';
    scores.comp++;
  }

  matchCount++;

  // Update DOM values instantly
  document.getElementById('user-score').innerText = scores.user;
  document.getElementById('tie-score').innerText = scores.tie;
  document.getElementById('comp-score').innerText = scores.comp;

  // Update text outputs
  document.getElementById('matchup-text').innerText = `You chose ${userChoice} vs Computer chose ${computerChoice}`;
  
  let outcomeEl = document.getElementById('outcome-text');
  outcomeEl.innerText = resultMesg;
  outcomeEl.className = 'outcome ' + statusClass;

  // Add to Previous Records History Log
  updateHistoryLog(matchCount, userChoice, computerChoice, resultMesg, statusClass);
}

function updateHistoryLog(round, user, comp, result, status) {
  let logContainer = document.getElementById('history-log');
  
  // Remove the "No matches played yet" text on the first round
  if (round === 1) {
    logContainer.innerHTML = '';
  }

  // Create new history entry element
  let listItem = document.createElement('li');
  listItem.className = 'history-item';
  
  listItem.innerHTML = `
    <span><strong>#${round}</strong> You: ${user} vs Comp: ${comp}</span>
    <span class="${status}"><strong>${result}</strong></span>
  `;
  
  // Insert new round details at the top of the list
  logContainer.insertBefore(listItem, logContainer.firstChild);
}

function resetGame() {
  // Clear standard scoring variables
  scores = { user: 0, tie: 0, comp: 0 };
  matchCount = 0;

  // Reset text screens
  document.getElementById('user-score').innerText = 0;
  document.getElementById('tie-score').innerText = 0;
  document.getElementById('comp-score').innerText = 0;
  document.getElementById('matchup-text').innerText = "Make your move to start the match!";
  
  let outcomeEl = document.getElementById('outcome-text');
  outcomeEl.innerText = "";
  outcomeEl.className = 'outcome';

  // Clear layout log records
  document.getElementById('history-log').innerHTML = `
    <li style="text-align: center; color: #888; padding: 10px;">No matches played yet.</li>
  `;
}