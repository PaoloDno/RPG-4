import EventBus from "../../../core/eventbus.js";
import ScreenManager from "../../screenmanager.js";
import GuildTownScreen from "./guildtown.js";
import InnTownScreen from "./inntown.js";
import StoreTownScreen from "./storetown.js";
import TowerTownScreen from "./towertown.js";

export const TownScreen = {
  enter(payload) {
    console.log("setState player location town");

    const app = document.getElementById("app");
    const screens = new ScreenManager(app);

    screens.register("Go_to_inn", InnTownScreen);
    screens.register("Go_to_store", StoreTownScreen);
    screens.register("Go_to_guild", GuildTownScreen);
    screens.register("Go_to_tower", TowerTownScreen);

    EventBus.on("Go_Inn", () => {
      console.log("Player clicked Start! Transition to next screen here...");
      EventBus.logActiveEvents();
      screens.show("Go_to_inn");
    });

    EventBus.on("Go_Store", () => {
      console.log("Player clicked Start! Transition to next screen here...");
      EventBus.logActiveEvents();
      screens.show("Go_to_store");
    });

    EventBus.on("Go_Guild", () => {
      console.log("Player clicked Start! Transition to next screen here...");
      EventBus.logActiveEvents();
      screens.show("Go_to_guild");
      EventBus.logActiveEvents();
    });

    EventBus.on("Go_Tower", () => {
      console.log("Player clicked Start! Transition to next screen here...");
      EventBus.logActiveEvents();
      screens.show("Go_to_tower");
      EventBus.logActiveEvents();
    });


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
      EventBus.emit("Go_Inn");
    });

    document.getElementById("store_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_Store");
    });

    document.getElementById("guild_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_Guild");
    });

    document.getElementById("tower_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_Tower");
    });
  },
};
