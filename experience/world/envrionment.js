import GSAP from "gsap";
import * as THREE from "three";

import Experience from "../experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.sunLightColor = new THREE.Color(255 / 255, 229 / 255, 200 / 255);
    this.sunLightIntensity = 0.8;
    this.areaLightColor = "#FFE5C8";
    this.areaLightIntensity = 1.5;
    this.ambientLightColor = new THREE.Color(255 / 255, 223 / 255, 186 / 255);
    this.ambientLightIntensity = 0.3;

    this.setSunlight();
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight(
      this.sunLightColor,
      this.sunLightIntensity
    );
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.near = 0.1;
    this.sunLight.shadow.camera.far = 100;
    this.sunLight.shadow.mapSize.set(4096, 4096);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.shadow.camera.top = 20;
    this.sunLight.shadow.camera.bottom = -20;
    this.sunLight.shadow.camera.left = -20;
    this.sunLight.shadow.camera.right = 20;
    this.sunLight.position.set(-5, 20, 10);
    this.scene.add(this.sunLight);

    this.areaLight = new THREE.RectAreaLight(
      this.areaLightColor,
      this.areaLightIntensity,
      5,
      6
    );
    this.areaLight.position.set(0, 5.5, 0);
    this.areaLight.rotation.y = Math.PI / 2;
    this.areaLight.lookAt(0, 0, 0);
    // this.scene.add(this.areaLight);

    this.ambientLight = new THREE.AmbientLight(
      this.ambientLightColor,
      this.ambientLightIntensity
    );
    this.scene.add(this.ambientLight);

    // const sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight);
    // this.scene.add(sunLightHelper);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 44 / 255,
        g: 59 / 255,
        b: 175 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 44 / 255,
        g: 59 / 255,
        b: 175 / 255,
      });
      GSAP.to(this.areaLight.color, {
        r: 44 / 255,
        g: 59 / 255,
        b: 175 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.6,
      });
      GSAP.to(this.areaLight, {
        intensity: 1.2,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.1,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 229 / 255,
        b: 200 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 223 / 255,
        b: 186 / 255,
      });
      GSAP.to(this.areaLight.color, {
        r: 255 / 255,
        g: 229 / 255,
        b: 200 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: this.sunLightIntensity,
      });
      GSAP.to(this.areaLight, {
        intensity: this.areaLightIntensity,
      });
      GSAP.to(this.ambientLight, {
        intensity: this.ambientLightIntensity,
      });
    }
  }

  resize() {}

  update() {}
}
