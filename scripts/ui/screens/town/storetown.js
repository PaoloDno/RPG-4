import EventBus from "../../../core/eventbus.js";
import { timePlusOne } from "../../../logic/time/time.js";
import { bgIMAGES } from "../../images/Images.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "./townscreen.js";

const StoreTownScreen = {
  enter(payload) {
    console.log("Entering Inn");

    timePlusOne();
    
    const app = document.getElementById("app");
    const screens = new ScreenManager(app);

    EventBus.on("Go_Town", () => {
      console.log("Player!");
      screens.show("Back_to_home");
    });

    screens.register("Back_to_home", TownScreen);
  },

  render(app) {
    app.innerHTML = `
    <div class="town-screen-wrapper">
      <div class="town-screen-container" style="background-image: url('${bgIMAGES.store || ""}')">  
      <h1> Town Store </h1>
      <button id="rest-inn-btn" class="town-screen-button">Buy</button>
      <button id="save-inn-btn" class="town-screen-button">Sell</button>
      <button id="back-btn" class="town-screen-button">Exit</button>
      </div>
    </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
  },
};

export default StoreTownScreen;