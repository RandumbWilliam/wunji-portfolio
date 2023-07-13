import GSAP from "gsap";
import * as THREE from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import Experience from "../experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModal();
    this.onMouseMove();
  }

  setModal() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "BobaLamp") {
        this.bobaLight = new THREE.PointLight("#FFDE88", 0, 1.5);
        this.bobaLight.castShadow = true;
        this.bobaLight.shadow.camera.far = 20;
        this.bobaLight.shadow.mapSize.set(2048, 2048);
        this.bobaLight.shadow.normalBias = 0.05;
        this.bobaLight.position.copy(child.position);
        this.actualRoom.add(this.bobaLight);
        this.roomChildren["PointLight"] = this.bobaLight;
      }

      if (child.name === "Room") {
        this.windowEmissionMesh = child.children[5];
        this.windowEmissionMaterial = new THREE.MeshLambertMaterial({
          color: "#ffffff",
          emissive: "#ffffff",
          emissiveIntensity: 1,
        });
        this.windowEmissionMesh.material = this.windowEmissionMaterial;
      }

      // Cosie original position 0.5655834674835205 1.867822527885437 -1.3063077926635742
      // Cosie original size 0.3737812638282776
      // Cosie original rotation 0.15636101736955482 -0.9161604507401715 0.3691230481147502

      child.scale.set(0, 0, 0);

      if (child.name === "Cosie") {
        // child.scale.set(1, 1, 1);
        child.position.set(0, 1, 0);
        child.rotation.set(0, Math.PI / 6, 0);
      }

      this.roomChildren[child.name] = child;
    });

    // const sphereSize = 1;
    // const pointLightHelper = new THREE.PointLightHelper(
    //   this.bobaLight,
    //   sphereSize
    // );
    // this.actualRoom.add(pointLightHelper);

    this.scene.add(this.actualRoom);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.windowEmissionMaterial.color, {
        r: 13 / 255,
        g: 21 / 255,
        b: 84 / 255,
      });
      GSAP.to(this.windowEmissionMaterial.emissive, {
        r: 13 / 255,
        g: 21 / 255,
        b: 84 / 255,
      });
    } else {
      GSAP.to(this.windowEmissionMaterial.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.windowEmissionMaterial.emissive, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
    }
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
