let userText = document.querySelector("input");
let textLength = document.getElementById("chars-left");
let maxAllowedChars = (productNameInputElement =
  document.getElementById("product-name"));

function getInputText(event) {
  let inputText = event.target.value;
  let chars_left = 60 - inputText.length;
  if (chars_left <= 10) {
  }
  textLength.textContent = chars_left;
}

userText.addEventListener("input", getInputText);
