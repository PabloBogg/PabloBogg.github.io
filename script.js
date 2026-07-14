// JavaScript Portfolio Pablo Boggetti
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isExpanded =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    navigation.classList.toggle("nav-links-open");
  });
}
