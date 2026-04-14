import EventBus from "../../../core/eventbus.js";
import { getStoryProgress } from "../../../core/SaveManager/savemange.js";
import { timePlusOne } from "../../../logic/time/time.js";
import { bgIMAGES } from "../../images/Images.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "./townscreen.js";

const InnTownScreen = {
  enter(payload) {
    console.log("Entering Inn");

    const app = document.getElementById("app");
    const screens = new ScreenManager(app);
    
    timePlusOne();
    let progress = getStoryProgress();

    EventBus.on("Go_Town", () => {
      console.log("Player!");
      screens.show("Back_to_home");
    });


    screens.register("Back_to_home", TownScreen);
  },

  render(app) {
    app.innerHTML = `
    <div class="town-screen-wrapper">
      <div class="town-screen-container" style="background-image: url('${bgIMAGES.Inn || ""}')">  
      <h1> Inn Tower </h1>
      <button id="rest-inn-btn" class="town-screen-button">Rest</button>
      <button id="save-inn-btn" class="town-screen-button">Save</button>
      <button id="back-btn" class="town-screen-button">Exit</button>
      </div>
    </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
  },
};

export default InnTownScreen;