console.dir(document);

// get acess to anchor element for link
// document.body.children[1].children[0].href = "https://google.com";

let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

anchorElement = document.querySelector("a");
anchorElement = document.querySelector("a p");
anchorElement = document.querySelector("#external-id");

// ADD AN ELEMENT
// 1. Create the new Element
let newAnchorElement = document.createElement("a");
newAnchorElement.href = "https://google.com";
newAnchorElement.textContent = "This leads to Google!";
// 2. Get access to the parent element that should hold the new element
let firstParagraph = document.querySelector("p");
console.dir(firstParagraph);
// 3. Insert the new element into the parent element content
firstParagraph.append(newAnchorElement);

// REMOVE ELEMENTS
// 1. Select the element that should be removed
let firstH1Element = document.querySelector("h1");
// 2. Remove it
firstH1Element.remove();
// Alternate way
// firstH1Element.parentElement.removeChild(firstH1Element); // for older browsers

// MOVE ELEMENTS
firstParagraph.parentElement.append(firstParagraph);

// innerHTML
console.log(firstParagraph.innerHTML);
firstParagraph.innerHTML = "Hi! This is <strong> important! </strong.";
