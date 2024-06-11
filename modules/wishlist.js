import initiateComponent from "../modules/initiateComponent.js";
import toggle from "../modules/toggle.js";

initiateComponent();

// Global Functions
window.themeTogglerHandle = () => {
    toggle()
};
window.showDrawer = () => {
  let drawer = document.getElementById("drawer");
  drawer.style.transform = "translateX(0%)";
  drawer.style.display = "flex";
};
window.closeDrawer = () => {
  let drawer = document.getElementById("drawer");
  drawer.style.transform = "translateX(110%)";
  drawer.style.display = "none";
};

// Fetch Data from data.json
const cart = document.getElementById("cartsView");
fetch("../data.json")
  .then((data) => data.json())
  .then((data) => data.products)
  .then(async (products) => {
    // console.log("hello");
    const baseCardFormat = await (await fetch("../components/cartCard.html")).text();
    products.forEach((product) => {
      let randomNumber = Math.floor(Math.random() * 5) + 1;
      if (randomNumber < 2) {
        let div = document.createElement("div");
        div.className = "cartCard";
        div.innerHTML = baseCardFormat
        .replace('replace-str-src', product["src"])
        .replace('replace-str-name', product["name"])
        .replace('replace-str-price', product["price"])
        cart.appendChild(div);
      }
    });
  });



