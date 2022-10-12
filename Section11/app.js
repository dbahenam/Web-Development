let age = 32;
let userName = "David";
let hobbies = ["Sports", "Cooking", "Reading"]; // array
let job = {
  title: "Developer",
  place: "New York",
  salary: 50000,
}; // object (dictionary)

let totalAdultYears;
function calculateAdultYears(userAge) {
  let result;
  result = userAge - 18;
  return result;
}

totalAdultYears = calculateAdultYears(age);
console.log(totalAdultYears);

age = 45;
totalAdultYears = calculateAdultYears(age);

console.log(totalAdultYears);

let person = {
  name: "Max", // Property
  //Method
  greet() {
    console.log("Hello");
  },
};

person.greet();
