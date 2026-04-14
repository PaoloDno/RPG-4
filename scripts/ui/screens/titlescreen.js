import EventBus from "../../core/eventbus.js";
import { bgIMAGES } from "../images/Images.js";
import ScreenManager from "../screenmanager.js";
import LoadScreen from "./loadscreen.js";
import StartScreen from "./startscreen.js";

// intiatialize buttons
const app = document.getElementById("game-view");
const screens = new ScreenManager(app);

const TitleScreen = {
  enter() {
    console.log("Entering Title Screen");
    
    screens.register("start_game", StartScreen);
    screens.register("load_game", LoadScreen);

    EventBus.on("GAME_START", () => {
      screens.show("start_game");
    });

    EventBus.on("GAME_LOAD", () => {
      screens.show("load_game");
    });

  },

  render(app) {
    app.innerHTML = "";

    const sceneWrapper = document.createElement("div");
    sceneWrapper.classList = "title-screen-wrapper";
    sceneWrapper.style.backgroundImage =  `url(${bgIMAGES.title})`;
    
    const startButton = document.createElement("button");
    startButton.id = "start-btn";
    startButton.innerText = "Start Game";

    const loadButton = document.createElement("button");
    loadButton.id = "load-btn";
    loadButton.innerText = "Load Game";


    const titleScreenText = document.createElement("div");
    titleScreenText.classList = "title-screen-text";
    titleScreenText.innerText = "Tower of Dungeons";

    sceneWrapper.append(startButton, loadButton, titleScreenText);

    app.appendChild(sceneWrapper);

    // Emit an event when the player clicks "Start"
    document.getElementById("start-btn").addEventListener("click", () => {
      EventBus.emit("GAME_START");
    });

    document.getElementById("load-btn").addEventListener("click", () => {
      EventBus.emit("GAME_LOAD");
    });
  }
};

export default TitleScreen;