import EventBus from "../../../core/eventbus.js";
import { timePlusOne } from "../../../logic/time/time.js";
import { bgIMAGES } from "../../images/Images.js";
import ScreenManager from "../../screenmanager.js";
import { TownScreen } from "./townscreen.js";

const GuildTownScreen = {
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
    <div class="town-screen-wrapper">
      <div class="town-screen-container" style="background-image: url('${bgIMAGES.Guild || ""}')">  
        <h1> Guild Tower </h1>
        <button id="Bounty" class="town-screen-button">Bounty</button>
        <button id="Salary" class="town-screen-button">Salary</button>
        <button id="back-btn" class="town-screen-button">Exit</button>
      </div>
    </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
  },
};

export default GuildTownScreen;