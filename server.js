import e from "express";
import cors from "cors";
import { collectibles, shoes } from "./data.js";

const app = e();
app.use(cors());

///////////////////////////
// Exercise 1
///////////////////////////
app.get("/greetings/:user", (req, res) => {
  res.send(`<h1>Greetings ${req.params.user}!</h1>`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);

  console.log("test");
});

///////////////////////////
// Exercise 2
///////////////////////////
// this determines if a string is only numbers, regex answer found online
/*
- ^: Asserts the position at the start of the string.
- \d: Matches any digit (equivalent to [0-9]).
- +: Matches one or more of the preceding token (one or more digits).
- $: Asserts the position at the end of the string.
*/
const regexNum = /^\d+$/;
app.get("/roll/:num", (req, res) => {
  let { num } = req.params;
  // this allows us to actually roll the num entered
  num = Number(num) + 1;
  // regex test to see if the string is only numbers
  if (regexNum.test(num)) {
    let randomNum = Math.floor(Math.random() * num);
    res.send(`<h1>You rolled a ${randomNum} </h1>`);
  } else {
    res.send(`<h1>You must specify a number</h1>`);
  }
});

///////////////////////////
// exercise 3
///////////////////////////

app.get("/collectibles/:index", (req, res) => {
  const { index } = req.params;
  //   if the index param is between 0 and the data arr length
  if (index > -1 && index < collectibles.length) {
    res.send(`<h1><span style="color:red">Product Name:</span> ${collectibles[index].name}
    </h1><h1><span style="color:red">Price:</span> ${collectibles[index].price}</h1>
`);
  }
  //   if it is not then
  else {
    res.send(`<h1>This item is not yet in stock. Check back soon!</h1>`);
  }
});

///////////////////////////
// exercise 4
///////////////////////////

app.get("/shoes", (req, res) => {
  const minPrice = req.query["min-price"];
  const maxPrice = req.query["max-price"];
  const { type } = req.query;
  //   this creates a deep clone of the array so I can mutate the clone to filter
  // based on multiple conditions
  let displayProducts = structuredClone(shoes);
  if (minPrice) {
    displayProducts = displayProducts.filter((item) => item.price >= minPrice);
  }
  if (maxPrice) {
    displayProducts = displayProducts.filter((item) => item.price <= maxPrice);
  }
  if (type) {
    displayProducts = displayProducts.filter((item) => item.type === type);
  }
  //   we do this no matter what to at least get the original list
  displayProducts = displayProducts.map((listItem) => {
    return `<li style="list-style:none">
    <span>Shoe Name: ${listItem.name} </span><br/>
    <span>Price: ${listItem.price}</span> <br/> 
    <span>Type: ${listItem.type}</span></li>`;
  });
  res.send(`<ul>${displayProducts}</ul>`);
});



///////////////////////////
// Listen on Port ...
///////////////////////////
app.listen(3001, (req, res) => {
  console.log(`listening on port 3001`);
});
