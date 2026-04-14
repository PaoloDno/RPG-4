import EventBus from "../../../core/eventbus.js";
import { getStateWorld } from "../../../core/SaveManager/savemange.js";
import { chapter0_0, chapter0_1, chapter0_2, chapter0_3, chapter0_4 } from "../../../game_content/Stories/chapter0_n.js";
import { bgIMAGES } from "../../images/Images.js";
import ScreenManager from "../../screenmanager.js";
import DialougeScreen from "../dialoguescreen.js";
import GuildTownScreen from "./guildtown.js";
import InnTownScreen from "./inntown.js";
import StoreTownScreen from "./storetown.js";
import TowerTownScreen from "./towertown.js";

export const TownScreen = {
  enter(payload) {
    console.log("setState player location town");

    const app = document.getElementById("game-view");
    const screens = new ScreenManager(app);

    screens.register("Go_to_inn", InnTownScreen);
    screens.register("Go_to_store", StoreTownScreen);
    screens.register("Go_to_guild", GuildTownScreen);
    screens.register("Go_to_tower", TowerTownScreen);

    screens.register("scene_0.0", DialougeScreen(chapter0_0));
    screens.register("scene_0.1", DialougeScreen(chapter0_1));
    screens.register("scene_0.2", DialougeScreen(chapter0_2));
    screens.register("scene_0.3", DialougeScreen(chapter0_3));
    screens.register("scene_0.4", DialougeScreen(chapter0_4));

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

    EventBus.on("Story0_0", () => {
      screens.show("scene_0.0");
    });
    EventBus.on("Story0_1", () => {
      screens.show("scene_0.1");
    });
    EventBus.on("Story0_2", () => {
      screens.show("scene_0.2");
    });
    EventBus.on("Story0_3", () => {
      screens.show("scene_0.3");
    });
    EventBus.on("Story0_4", () => {
      screens.show("scene_0.4");
    });

  },

  render() {
    const app = document.getElementById("game-view");
    app.innerHTML = `
    <div class="town-screen-wrapper" >
    <div class="town-screen-container" style="background-image: url('${bgIMAGES.town || ""}')">
      <h3>Town</h3>
      <button id="inn_1-btn" class="town-screen-button">Go to Inn</button>
      <button id="store_1-btn" class="town-screen-button">Go to Store</button>
      <button id="guild_1-btn" class="town-screen-button">Go to Guild</button>
      <button id="tower_1-btn" class="town-screen-button">Go to Tower</button>
    </div>
    </div>
    `;

    const world = getStateWorld();

    const progress = world.progress;

    document.getElementById("inn_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      EventBus.emit("Go_Inn");
    });

    document.getElementById("store_1-btn").addEventListener("click", () => {
      // Emit an event when the player clicks "Start"
      console.log(progress); // progress = 0
      if (progress > 1) {
      EventBus.emit("Go_Store");
      } else {
        EventBus.emit("Story0_1");
      }
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
