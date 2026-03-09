import EventBus from "../../core/eventbus.js";
import ScreenManager from "../screenmanager.js";
import StartScreen from "./startscreen.js";

// intiatialize buttons
const app = document.getElementById("app");
const screens = new ScreenManager(app);

const TitleScreen = {
  enter() {
    console.log("Entering Title Screen");
    
    screens.register("start", StartScreen);

    EventBus.on("GAME_START", () => {
      screens.show("start");
    });


  },

  render(app) {
    app.innerHTML = `
      <div class="full in-center col">
      <h1>!!!Dungeon Crawler!!!</h1>
      <button id="start-btn">Start Game</button>
      <button id="load-btn">Load Game</button>
      </div>
    `;

    
    // Emit an event when the player clicks "Start"
    document.getElementById("start-btn").addEventListener("click", () => {
      EventBus.emit("GAME_START");
    });
  }
};

export default TitleScreen;