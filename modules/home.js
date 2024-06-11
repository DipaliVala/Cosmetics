// module
import initiateComponent from "../modules/initiateComponent.js";
import toggle from "../modules/toggle.js";
initiateComponent();

// Function to be called in navbar are set in windows to set it globally
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
window.themeTogglerHandle = () => toggle();
window.addToLocalStorage = (index) => {
  console.log("method called");
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

let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const translateValue = -currentIndex * 100 + '%';
    document.querySelector('.slider-wrapper').style.transform = 'translateX(' + translateValue + ')';
  }

  // Auto slide change (optional)
  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000); // Change slide every 5 seconds, adjust as needed

// Fetch Items from cart randomly
const cart = document.getElementById("cardHolder");
fetch("data.json")
  .then((data) => data.json())
  .then((data) => data.products)
  .then(async (products) => {
    const baseCardFormat = await (
      await fetch("components/itemCard.html")
    ).text();
    for (let index in products) {
      let randomNumber = Math.floor(Math.random() * 10) + 1;
      if (randomNumber < 4) {
        let div = document.createElement("div");
        div.innerHTML = baseCardFormat
          .replace("replace-str-src", products[index]["src"])
          .replace("replace-str-name", products[index]["name"])
          .replace("replace-str-price", products[index]["price"])
          .replace("replace-str-index", index);
        cart.appendChild(div);
      }
    }
  });
