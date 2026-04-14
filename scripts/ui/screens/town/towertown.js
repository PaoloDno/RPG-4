import EventBus from "../../../core/eventbus.js";
import { getStateWorld } from "../../../core/SaveManager/savemange.js";
import { timePlusOne } from "../../../logic/time/time.js";
import { bgIMAGES, storyPortraitImages } from "../../images/Images.js";
import { showNotification } from "../../notifications/notificationModal.js";
import ScreenManager from "../../screenmanager.js";
import FloorScreen from "../floor/floorscreen.js";
import { TownScreen } from "./townscreen.js";

const TowerTownScreen = {
  enter(payload) {
    console.log("Entering Inn");

    timePlusOne();
    
    const app = document.getElementById("app");
    const screens = new ScreenManager(app);

    const world = getStateWorld();

    const progress = world.progress;

    EventBus.on("Go_Town", () => {
      console.log("Player!");
      screens.show("Back_to_home");
    });

    EventBus.on("Enter_Tower_1", () => {
      console.log("Enter Tower!");

      if (progress < 5) {
        showNotification({
          speaker: "Town Guard",
          portrait: storyPortraitImages.Guard,
          text: "Halt! Entering without permission with the guild is not allowed!",
        });
      } else if (progress = 5) {
        showNotification({
          speaker: "Town Guard",
          portrait: storyPortraitImages.Guard,
          text: "I see.. I verefied ur Adventurer Card You are free to enter the tower anytime you want",
        });
      } else {
      screens.show("Enter_Tower");
      }
    })

    EventBus.on("Enter_Tower_20", () => {
      if(progress < 10) {
        showNotification({
          speaker: "Town Guard",
          portrait: storyPortraitImages.Guard,
          text: "Halt! For your own good, dont proceed further. big and dangerous monster awaits in that floor!",
        });
      }
    })

    screens.register("Back_to_home", TownScreen);
    screens.register("Enter_Tower", FloorScreen);
  },

  render(app) {
    app.innerHTML = `
    <div class="town-screen-wrapper">
      <div class="town-screen-container" style="background-image: url('${bgIMAGES.Tower || ""}')">  
      <h1> Tower </h1>
      <button id="enter-tower-btn-1" class="town-screen-button">Floor 1</button>
      <button id="enter-tower-btn-20" class="town-screen-button">Floor 20</button>
      <button id="back-btn" class="town-screen-button">Exit</button>
      </div>
    </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
    document.getElementById("enter-tower-btn-1").addEventListener("click", () => {
      EventBus.emit("Enter_Tower_1");
    });
    document.getElementById("enter-tower-btn-20").addEventListener("click", () => {
      EventBus.emit("Enter_Tower_20");
    });


  },
};

export default TowerTownScreen;