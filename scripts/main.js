import EventBus from "./core/eventbus.js";
import ScreenManager from "./ui/screenmanager.js";
import TitleScreen from "./ui/screens/titlescreen.js";
import StartScreen from "./ui/screens/startscreen.js";
import { TownScreen } from "./ui/screens/town/townscreen.js";

const app = document.getElementById("app");
const screens = new ScreenManager(app);

// Register screens
screens.register("title", TitleScreen);
screens.register("start", StartScreen);
screens.register("Town", TownScreen);

// Show title screen
screens.show("title");






// short debounce for clicks
let clickLocked = false;

document.addEventListener("click", (e) => {
  if (clickLocked) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }

  clickLocked = true;

  setTimeout(() => {
    clickLocked = false;
  }, 350);
}, true); // capture phase



// Buttons
// event busses

EventBus.on("GAME_START", () => {
  console.log("Player clicked Start! Transition to next screen here...");
  EventBus.logActiveEvents();
  screens.show("start");
  EventBus.logActiveEvents();
});
