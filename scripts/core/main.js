import EventBus from "./eventbus.js";
import ScreenManager from "../ui/screenmanager.js";
import TitleScreen from "../ui/screens/titlescreen.js";

const app = document.getElementById("app");
const screens = new ScreenManager(app);

// Register screens
screens.register("title", TitleScreen);

// Show title screen
screens.show("title");

// Listen to EventBus
EventBus.on("GAME_START", () => {
  console.log("Player clicked Start! Transition to next screen here...");
  app.innerHTML = "<h2>🚀 Game Started!</h2>";
});