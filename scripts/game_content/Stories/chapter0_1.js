// welcome to town

import { AddProgress } from "../../core/SaveManager/savemange.js";
import { bgIMAGES, storyPortraitImages } from "../../ui/images/Images.js";
import ScreenManager from "../../ui/screenmanager.js";
import { TownScreen } from "../../ui/screens/town/townscreen.js";


const app = document.getElementById("game-view");
const screens = new ScreenManager(app);



export const chapter0_1 = [
  {
    system: true,
    text: "You just got here why dont you take a rest and try to gather information in the town",
  },
  {
    system: true,
    text: "You were wondering around town when someone approach you.",
  },
  {
    system: false,
    text: "'Hello Traveller would you mind helping me'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Black Haired Girl",
    text: "Welcome to our family Inn! My name is Eto",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "oh your new here? Do you know how things work?",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "oh your new here? Do you know how things work?",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "oh your new here? Do you know how things work?",
  },
  {
    system: true,
    text: "go to title", // will not show
    callback: () => {
      screens.register("town", TownScreen);
      AddProgress();
      screens.show("town");
    },
  },
]