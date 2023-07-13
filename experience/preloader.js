import EventEmitter from "events";
import GSAP from "gsap";
import Experience from "./experience";
import convert from "./utils/convertDivsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchDevice", (device) => {
      this.device = device;
    });

    this.world.on("worldReady", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero__title"));
    convert(document.querySelector(".hero__description"));
    convert(document.querySelector(".hero__subheading--first"));
    convert(document.querySelector(".hero__subheading--second"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animateText", { y: 0, yPercent: 100 });
      this.timeline.to("preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      if (this.device === "desktop") {
        this.camera.orthographicCamera.position.set(0.2, 2.3, 0);
        this.timeline
          .to(this.roomChildren.Cosie.scale, {
            x: 3,
            y: 3,
            z: 3,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -3,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.room.scale.set(0.5, 0.5, 0.5);
        this.camera.orthographicCamera.position.set(0.2, 1, 0);
        this.timeline
          .to(this.roomChildren.Cosie.scale, {
            x: 2,
            y: 2,
            z: 2,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -3,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline
        .to(".intro-text .animateText", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.2)",
        })
        .to(
          ".chevron-down",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.secondTimeline
        .to(
          ".intro-text .animateText",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeOut"
        )
        .to(
          ".chevron-down",
          {
            opacity: 0,
          },
          "fadeOut"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
            duration: 0.7,
          },
          "same"
        )
        .to(
          this.roomChildren.Cosie.position,
          {
            x: 0.5655834674835205,
            y: 1.867822527885437,
            z: -1.3063077926635742,
          },
          "same"
        )
        .to(
          this.roomChildren.Cosie.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "same"
        )
        .to(
          this.roomChildren.Cosie.rotation,
          {
            x: 0.15636101736955482,
            y: -0.9161604507401715 + Math.PI * 2,
            z: 0.3691230481147502,
          },
          "same"
        )
        .to(
          this.roomChildren.Room.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "same"
        )
        .to(
          this.roomChildren.Bedframe.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.Mattress.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.Blanket.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.PinkPillow.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "pillow"
        )
        .to(
          this.roomChildren.BluePillow.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "pillow"
        )
        .to(
          this.roomChildren.WhitePillow.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "pillow"
        )
        .to(
          ".hero__title .animateText",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "introText"
        )
        .to(
          ".hero__description .animateText",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "introText"
        )
        .to(
          ".hero__subheading--first .animateText",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "introText"
        )
        .to(
          ".hero__subheading--second .animateText",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "introText"
        )
        .to(
          this.roomChildren.FairyLights.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.WindowPlant.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.5"
        )
        .to(
          this.roomChildren.AnjaliMistry.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.Bookshelf.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.BulletBoard.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.2"
        )
        .to(
          this.roomChildren.Shelf.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1"
        )
        .to(this.roomChildren.HangingPlant.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.PusheenPancake.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.PictureFrame.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.RubiksCube.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Calendar.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.GreenBook.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.PinkBook.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.BlueBook.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.YellowBook.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.ShoeBox.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.PotPlant.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Saitama.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.SmallPlant.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.CatLamp.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Carpet.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.DeskLegs.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Desk.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Monitor.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Computer.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.MousePad.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.HeadphoneStand.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Headphones.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.BobaLamp.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Keyboard.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.Mouse.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.ChairLegs.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(
          this.roomChildren.Chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "chair"
        )
        .set(this.roomChildren.PointLight, {
          intensity: 0.9,
        })
        .to(
          this.roomChildren.Chair.rotation,
          {
            y: -0.2143420240348831 + Math.PI * 2,
            ease: "power2.out",
            duration: 1,
          },
          "chair"
        )
        .to(".chevron-down", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouchStart(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initalY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.toughMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouchStart.bind(this);
    this.toughMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.toughMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.emit("enableControls");
    this.scaleFlag = false;
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-3, 0, 0);
    } else {
      this.room.position.set(0, 0, -3);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(1, 1, 1);
    } else {
      this.room.scale.set(0.5, 0.5, 0.5);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
