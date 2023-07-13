import EventEmitter from "events";

export default class Theme extends EventEmitter {
  constructor() {
    super();

    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-bar__button");
    this.toggleCircle = document.querySelector(".toggle-bar__toggle");

    this.setEventListeners();
  }

  setEventListeners() {
    this.toggleButton.addEventListener("click", () => {
      this.toggleCircle.classList.toggle("toggle-bar__toggle--slide");
      this.theme = this.theme === "light" ? "dark" : "light";
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");

      this.emit("switch", this.theme);
    });
  }
}
