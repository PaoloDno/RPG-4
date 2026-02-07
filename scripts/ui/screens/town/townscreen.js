import EventBus from "../../../core/eventbus.js";
import ScreenManager from "../../screenmanager.js";

const app = document.getElementById("app");
const screens = new ScreenManager(app);


export const TownScreen = {
  enter(payload) {
    console.log("setState player location town")
  },

  render(app) {
    app.innerHTML = `
    <div class="full in-center col">
      <button id="inn_1-btn">Go to Inn</button>
      <button id="store_1-btn">Go to Store</button>
      <button id="guild_1-btn">Go to Guild</button>
      <button id="tower_1-btn">Go to Tower</button>
    </div>
    `;

    document.getElementById("inn_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_to_Inn");
    });

    document.getElementById("store_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_to_Store");
    });

    document.getElementById("guild_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_to_guild");
    });

    document.getElementById("tower-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("enter_to_tower");
    });

  }
}