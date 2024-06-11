import initiateComponent from "../modules/initiateComponent.js";
import toggle from "../modules/toggle.js";

initiateComponent();
const cart = document.getElementById("cartsView");

window.themeTogglerHandle = () => {
  toggle();
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

const parsePrice = (price) => {
  let finalPrice = 0;
  let priceSize = price.length;
  for (let i = 0; i < priceSize; i++) {
    if (!isNaN(price[i]) && price[i] != " ") {
      finalPrice = finalPrice * 10 + parseInt(price[i]);
    }
  }
  return finalPrice;
};

const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

window.clearCart = () => {
  localStorage.setItem("cart-items", null);
  let items = JSON.parse(localStorage.getItem("cart-items"));
  document.getElementById("cartCount").innerHTML = items ? items.length : 0;
  cart.innerHTML = "";
  let prices=document.getElementById("totalPrice");
  prices.innerHTML="Rs 0";
};

fetch("../data.json")
  .then((data) => data.json())
  .then((data) => data.products)
  .then(async (products) => {
    let totalCost = 0;
    const cartItems = JSON.parse(localStorage.getItem("cart-items"));
    const baseCardFormat = await (
      await fetch("../components/cartCard.html")
    ).text();
    for (let item in cartItems) {
      let div = document.createElement("div");
      div.className = "cartCard";
      let productIndex = cartItems[item];
      let product = products[productIndex];
      div.innerHTML = baseCardFormat
        .replace("replace-str-src", product["src"])
        .replace("replace-str-name", product["name"])
        .replace("replace-str-price", product["price"])
        + `<button onclick="removeItem(${item}, '${product["price"]}')">Remove</button>`;
      cart.appendChild(div);
      totalCost += parsePrice(product["price"]);
    }
    document.getElementById("totalPrice").innerText =
      "Rs " + numberWithCommas(totalCost);
  });

window.removeItem = (index, price) => {
  let cartItems = JSON.parse(localStorage.getItem("cart-items"));
  if (index >= 0 && index <= cartItems.length) {
    cartItems.splice(index, 1); // Remove item at index
    localStorage.setItem("cart-items", JSON.stringify(cartItems)); // Update cart items in local storage
    document.getElementById("cartCount").innerText = cartItems ? cartItems.length : 0;

    // Update total price
    let totalPriceElement = document.getElementById("totalPrice");
    let currentTotalPrice = parsePrice(totalPriceElement.innerText);
    let newTotalPrice = currentTotalPrice - parsePrice(price);
    totalPriceElement.innerText = "Rs " + numberWithCommas(newTotalPrice);

    // Remove the corresponding cart item from the DOM
    let cartCards = document.getElementsByClassName("cartCard");
    if (cartCards[index]) {
      cartCards[index].remove();
    }
  } else {
    console.error("Invalid index provided to removeItem function.");
  }
};