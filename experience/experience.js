import * as THREE from "three";
import assets from "./utils/assets";
import Resources from "./utils/resources";
import Sizes from "./utils/sizes";
import Time from "./utils/time";

import Camera from "./camera";
import Preloader from "./preloader";
import Renderer from "./renderer";
import Theme from "./theme";

import Controls from "./world/controls";
import World from "./world/world";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enableControls", () => {
      this.controls = new Controls();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }

  update() {
    this.preloader.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
