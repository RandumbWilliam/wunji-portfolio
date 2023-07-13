import EventEmitter from "events";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    const fixedHeight = 768;
    const initialFustrum = (10 * this.height) / fixedHeight;
    const tanFOV = Math.tan(((Math.PI / 180) * initialFustrum) / 2);
    const initialWindowHeight = window.innerHeight;

    this.fustrum =
      (360 / Math.PI) *
      Math.atan(tanFOV * (window.innerHeight / initialWindowHeight));

    if (this.width < 968) {
      this.device = "mobile";
    } else {
      this.device = "desktop";
    }

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.fustrum =
        (360 / Math.PI) *
        Math.atan(tanFOV * (window.innerHeight / initialWindowHeight));

      this.emit("resize");

      if (this.width < 968 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("switchDevice", this.device);
      } else if (this.width >= 968 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("switchDevice", this.device);
      }
    });
  }
}
