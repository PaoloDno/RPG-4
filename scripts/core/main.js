import EventBus from "./eventbus.js";
import ScreenManager from "../ui/screenmanager.js";
import TitleScreen from "../ui/screens/titlescreen.js";
import StartScreen from "../ui/screens/startscreen.js";

const app = document.getElementById("app");
const screens = new ScreenManager(app);

// Register screens
screens.register("title", TitleScreen);
screens.register("start", StartScreen);


// Show title screen
screens.show("title");


// Buttons
EventBus.on("GAME_START", () => {
  console.log("Player clicked Start! Transition to next screen here...");
  EventBus.logActiveEvents();
  screens.show("start");
  EventBus.logActiveEvents();
});

EventBus.on("SCENE_", () => {
  console.log("AA")
})

