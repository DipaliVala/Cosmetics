// import modules
import initiateComponent from "../modules/initiateComponent.js";
import fetchItemsByCategory from "../modules/fetchItemsByCategory.js";
import toggle from "../modules/toggle.js";

// initialize navbar
initiateComponent();

// Function to be called in navbar are set in windows to set it globally
window.themeTogglerHandle = () => {
    toggle();
}
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
window.addToLocalStorage = (index) => {
  const cartItems = localStorage.getItem("cart-items");
  if (cartItems == null || cartItems == "null") {
    localStorage.setItem("cart-items", JSON.stringify([index]));
  } else {
    const indexList = JSON.parse(cartItems);
    localStorage.setItem("cart-items", JSON.stringify([...indexList, index]));
  }
  let items = JSON.parse(localStorage.getItem("cart-items"));
  document.getElementById("cartCount").innerHTML = items.length;
};
const holder = document.getElementById("cardHolder"); // Get Card Holder Element
window.getItems = (category) => {
  holder.innerHTML = "";
  fetchItemsByCategory(holder, category);
};

// Capitalize the first letter of string
function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

// Initialize with electronics items
getItems("electronics");

// Fetch Catagories from data.json
fetch("../data.json")
  .then((resp) => resp.json())
  .then((data) => data.categories)
  .then((categories) => {
    const categoryDiv = document.getElementById("categories");
    categories.forEach((category) => {
      let div = document.createElement("div");
      div.innerHTML = `
      <button class="categoryButton" onclick="getItems('${category}')">
        ${capitalizeFirstLetter(category)}
      </button>`;
      categoryDiv.appendChild(div);
    });
  });
