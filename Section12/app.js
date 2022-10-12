let paragraphElement = document.querySelector("p");

function changeParagraphText() {
  paragraphElement.textContent = "Clicked!";
}

paragraphElement.addEventListener("click", changeParagraphText);
// callback function: a function that is passed as a paremeter value to another
// functin or method to be executed in the future.

let textInput = document.querySelector("input");

function getInputText(event) {
  //let enteredText = textInput.value;
  let enteredText = event.target.value;
  // let enteredText = event.data; => This is different!
  console.log(enteredText);
  console.log(event);
}
textInput.addEventListener("input", getInputText);
