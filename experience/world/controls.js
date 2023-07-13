import Lenis from "@studio-freight/lenis";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Experience from "../experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.environment = this.experience.world.envrionment;
    this.room = this.experience.world.room.actualRoom;
    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;
    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setUpLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const page = document.body.querySelector(".page");
    const pageWrapper = document.body.querySelector(".page__wrapper");

    ScrollTrigger.create({
      trigger: page,
      start: "top top",
      end: "bottom center",
      scrub: true,
    });

    return lenis;
  }

  setSmoothScroll() {
    this.lenis = this.setUpLenis();
  }

  setScrollTrigger() {
    let matchMedia = GSAP.matchMedia();

    matchMedia.add("(min-width: 969px)", () => {
      // Reset
      this.room.scale.set(1, 1, 1);
      this.camera.orthographicCamera.position.set(0.2, 2.3, 0);

      // About Section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.camera.orthographicCamera.position, {
        x: -4.1,
      });

      // Experience section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 2.5,
            y: 2.5,
            z: 2.5,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            x: 1,
            y: 5,
          },
          "same"
        );

      // Contact Section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            x: 4,
            y: 2.3,
          },
          "same"
        );
    });

    matchMedia.add("(max-width: 968px)", () => {
      // Reset
      this.room.scale.set(0.5, 0.5, 0.5);
      this.camera.orthographicCamera.position.set(0.2, 1, 0);

      // About Section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 1.5,
            y: 1.5,
            z: 1.5,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 3.2,
          },
          "same"
        );

      // Experience section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(
        this.camera.orthographicCamera.position,
        {
          x: -2.5,
        },
        "same"
      );

      // Contact Section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            x: 0.2,
            y: -1,
          },
          "same"
        );
    });

    matchMedia.add("all", () => {
      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressBar = section.querySelector(".progress-bar");
        this.progressBarContainer = section.querySelector(
          ".progress-bar__container"
        );

        if (section.classList.contains("section--right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
        GSAP.from(this.progressBarContainer, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressBar,
            pinSpacing: false,
          },
        });
      });

      // Animations
      // First Circle
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circleFirst.scale, {
        x: 10,
        y: 10,
        z: 10,
      });

      // Second Circle
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circleSecond.scale, {
        x: 10,
        y: 10,
        z: 10,
      });

      // Third Circle
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circleThird.scale, {
        x: 10,
        y: 10,
        z: 10,
      });
    });
  }

  resize() {}

  update() {}
}
