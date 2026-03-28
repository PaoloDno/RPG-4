import AudioManager from "./core/AudioManager/AudioManager.js";
import { subscribe } from "./core/SaveManager/savemange.js";
import { AudioHeader } from "./ui/header/Component/AudioHeader.js";
import { GoldHeader } from "./ui/header/Component/GoldHeader.js";
import { PartyHeader } from "./ui/header/Component/PartyHeader.js";
import { TimeHeader } from "./ui/header/Component/TimeHeader.js";
import HeaderManager from "./ui/header/headerUI.js";
import ScreenManager from "./ui/screenmanager.js";
import TitleScreen from "./ui/screens/titlescreen.js";

const screens = ScreenManager.getInstance();
const headerRoot = document.getElementById("game-header");

const app = document.getElementById("game-view");
const audio = new AudioManager();

audio.loadSound("clickInGame", "./../assets/music/effect/Coins.wav");

// subscribe header
subscribe(() => {
  headerManager.render();
});

// Register screens
screens.register("title", TitleScreen);

// Show title screen
screens.show("title");

// short debounce for clicks
let clickLocked = false;

document.addEventListener(
  "click",
  (e) => {
    if (clickLocked) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    clickLocked = true;

    setTimeout(() => {
      clickLocked = false;
    }, 350);
  },
  true,
);

// click
document.addEventListener(
  "click",
  () => {
    audio.playSound("clickInGame");
  },
  true
);


// bgm

let musicStarted = false;

document.addEventListener(
  "click",
  (e) => {
    if (!musicStarted) {
      audio.playMusic("./../assets/music/bgm/Title.wav");
      musicStarted = true;
    }
  },
  { once: true },
);

// Header

const headerManager = new HeaderManager(headerRoot);
headerManager.register("logo", TimeHeader); // logo
headerManager.register("party", PartyHeader); // party
headerManager.register("gold", GoldHeader); //
headerManager.register("audio", AudioHeader);
headerManager.register("music", TimeHeader); // sound

headerManager.render();

