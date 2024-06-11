import initiateComponent from "../modules/initiateComponent.js";
import toggle from "../modules/toggle.js";

// initiate navbar
initiateComponent();

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