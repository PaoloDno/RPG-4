import EventBus from "../../../core/eventbus.js";
import { timePlusOne } from "../../../logic/time/time.js";
import ScreenManager from "../../screenmanager.js";
import FloorScreen from "../floor/floorscreen.js";
import { TownScreen } from "./townscreen.js";

const TowerTownScreen = {
  enter(payload) {
    console.log("Entering Inn");

    timePlusOne();
    
    const app = document.getElementById("app");
    const screens = new ScreenManager(app);

    EventBus.on("Go_Town", () => {
      console.log("Player!");
      screens.show("Back_to_home");
    });

    EventBus.on("Enter_Tower", () => {
      console.log("Enter Tower!");
      screens.show("Enter_Tower");
    })

    screens.register("Back_to_home", TownScreen);
    screens.register("Enter_Tower", FloorScreen);
  },

  render(app) {
    app.innerHTML = `
    <div class="full in-center col">
      <h1>🌟 Tower Entracne 🌟</h1>
      <button id="back-btn">Exit</button>
      <button id="enter-tower-btn">EnterTower</button>
      </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      EventBus.emit("Go_Town");
    });
    document.getElementById("enter-tower-btn").addEventListener("click", () => {
      EventBus.emit("Enter_Tower");
    });

  },
};

export default TowerTownScreen;