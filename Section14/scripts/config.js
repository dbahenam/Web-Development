function openPlayerConfig(event) {
  // get access to overlay and backdrop
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
  const selectedPlayerID = event.target.dataset.playerid;
  editedPlayer = +selectedPlayerID; // + "1" => 1 as a number
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("errors");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = ""; // reset input text
}

function savePlayerConfig(event) {
  /* remove default behavior of submitting form(i.e http request to some server) */
  event.preventDefault();
  /* use object blueprint to gather input data */
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim(); // get value of input 'name', trim removes whitespace after content

  /* check if enteredPlayer is empty string. emptry string is considered false */
  if (!enteredPlayerName) {
    // event.target is element form
    event.target.firstElementChild.classList.add("errors");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return; // stops execution of the code here
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName; // set h3 to entered player name

  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
