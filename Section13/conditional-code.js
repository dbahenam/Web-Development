const productNameInputElement = document.getElementById("product-name");
const remainingCharsElement = document.getElementById("remaining-chars");

const maxAllowedChars = productNameInputElement.maxLength;
const lowCount = 10;
// console.dir(productNameInputElement); --> find maxLength function

function updateRemainingCharacters(event) {
  const enteredText = event.target.value;
  const enteredTextLength = enteredText.length;

  const remainingCharacters = maxAllowedChars - enteredTextLength;
  if (remainingCharacters === 0) {
    remainingCharsElement.classList.add("error");
    productNameInputElement.classList.add("error");
  } else if (remainingCharacters <= lowCount) {
    remainingCharsElement.classList.add("warning");
    productNameInputElement.classList.add("warning");
  } else {
    remainingCharsElement.classList.remove("error", "warning");
    productNameInputElement.classList.remove("error", "warning");
  }

  // constant because we are not reassigning the variable to another html element
  // we are allowed to change some of it's properties
  remainingCharsElement.textContent = remainingCharacters;
}

productNameInputElement.addEventListener("input", updateRemainingCharacters);
