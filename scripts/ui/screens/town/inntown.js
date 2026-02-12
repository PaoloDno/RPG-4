import EventBus from "../../../core/eventbus.js";
import { timePlusOne } from "../../../logic/time/time.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "./townscreen.js";

const InnTownScreen = {
  enter(payload) {
    console.log("Entering Inn");

    const app = document.getElementById("app");
    const screens = new ScreenManager(app);
    
    timePlusOne();

    EventBus.on("Go_Town", () => {
      console.log("Player!");
      screens.show("Back_to_home");
    });


    screens.register("Back_to_home", TownScreen);
  },

  render(app) {
    app.innerHTML = `
    <div class="full in-center col">
      <h1> Inn Tower </h1>
      <button id="back-btn">Exit</button>
      </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
  },
};

export default InnTownScreen;