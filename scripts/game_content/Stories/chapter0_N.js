// welcome to town

import { AddProgress } from "../../core/SaveManager/savemange.js";
import { bgIMAGES, storyPortraitImages } from "../../ui/images/Images.js";
import ScreenManager from "../../ui/screenmanager.js";
import { TownScreen } from "../../ui/screens/town/townscreen.js";


const app = document.getElementById("game-view");
const screens = new ScreenManager(app);

// add a scene you help a kid by name only find her mother
// 
export const chapter0_0 = [
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "The streets are busy, filled with merchants shouting and people rushing past. You stand still, unsure where to go.",
  },
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "Lost in thought, you accidentally bump into someone in the market district.",
  },
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "You’ve only just arrived… maybe it’s best to rest and gather information about this town first.",
  },
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "*THUD!",
  },
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "*A crying kid bump you from the back",
  },
  { 
    partyResponseStage: true,
    speakerName: 3,
    text_response: 3,
    background: bgIMAGES.Parade
  },
  {
    system: false,
    background: bgIMAGES.Parade,
    speakerName: "Lost Kid",
    text: "*cries loudly*",
  },
  { 
    partyResponseStage: true,
    speakerName: 4,
    text_response: 4,
    background: bgIMAGES.Parade
  },
  {
    system: false,
    background: bgIMAGES.Parade,
    text: "times passes before you find parents",
  },
  { 
    partyResponseStage: true,
    speakerName: 5,
    text_response: 5,
    background: bgIMAGES.Parade
  },
  {
    system: false,
    background: bgIMAGES.Parade,
    text: "*Kids said his thanks, and Parents thanked you and said something*",
    callback: () => {
      
    }
  },
  { 
    partyResponseStage: true,
    speakerName: 6,
    text_response: 6,
    background: bgIMAGES.Parade
  },
  { 
    partyResponseStage: true,
    speakerName: 6,
    text_response: 6,
    background: bgIMAGES.Parade
  },
  {
    background: bgIMAGES.Parade,
    system: true,
    text: "As you wander aimlessly, taking in the unfamiliar surroundings, someone suddenly approaches you.",
  },
  {
    background: bgIMAGES.Parade,
    system: false,
    text: "'Hello, traveler… would you mind helping me?'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Welcome to our family inn! My name is Eto.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "You look like you're new here… not many people wander around with that lost expression.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "This town can be overwhelming at first. Travelers come and go, but not everyone knows where to start.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Why don’t you rest here for a while? I can tell you everything you need to know… for a small favor, of course.",
  },
  {
    system: true,
    text: "You feel like this might be the start of something.",
  },
  {
    system: true,
    text: "go to title", // will not show
    callback: () => {
      showNotification({
        text: "3 AYAYAYAY!!!",
        onConfirm: next,
      });
      stateAddKeyItem("VeggieSoup")
      AddProgress();
    },
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
];


// the woman(eto) gives you a key item veggie soup t give in the store
export const chapter0_1 = [
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "The streets are busy, filled with merchants shouting and people rushing past. You stand still, unsure which shop to enter.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "Lost in thought, you accidentally bump into someone in the market district.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "You’ve only just arrived… maybe it’s best to rest and gather information about this town first.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "As you wander aimlessly, taking in the unfamiliar surroundings, someone suddenly approaches you.",
  },
  {
    system: true,
    text: "go to title", // will not show
    callback: () => {
      showNotification({
        text: "3 AYAYAYAY!!!",
        onConfirm: next,
      });
      stateAddKeyItem("MinthrilOre")
      AddProgress();
    },
  },
  {
    background: bgIMAGES.Inn,
    system: false,
    text: "'Hello, traveler… would you mind helping me?'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Welcome to our family inn! My name is Eto.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "You look like you're new here… not many people wander around with that lost expression.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "This town can be overwhelming at first. Travelers come and go, but not everyone knows where to start.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Why don’t you rest here for a while? I can tell you everything you need to know… for a small favor, of course.",
  },
  {
    system: true,
    text: "You feel like this might be the start of something.",
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
];



// the woman takes the soup and give you Minthril Dagger LVL 5 and another quest as you are to go to guild
// she gives you a package

export const chapter0_2 = [
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "The streets are busy, filled with merchants shouting and people rushing past. You stand still, unsure which shop to enter.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "Lost in thought, you accidentally bump into someone in the market district.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "You’ve only just arrived… maybe it’s best to rest and gather information about this town first.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "As you wander aimlessly, taking in the unfamiliar surroundings, someone suddenly approaches you.",
  },
  {
    background: bgIMAGES.Inn,
    system: false,
    text: "'Hello, traveler… would you mind helping me?'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Welcome to our family inn! My name is Eto.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "You look like you're new here… not many people wander around with that lost expression.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "This town can be overwhelming at first. Travelers come and go, but not everyone knows where to start.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Why don’t you rest here for a while? I can tell you everything you need to know… for a small favor, of course.",
  },
  {
    system: true,
    text: "You feel like this might be the start of something.",
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
];


// 
export const chapter0_3 = [
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "The streets are busy, filled with merchants shouting and people rushing past. You stand still, unsure which shop to enter.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "Lost in thought, you accidentally bump into someone in the market district.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "You’ve only just arrived… maybe it’s best to rest and gather information about this town first.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "As you wander aimlessly, taking in the unfamiliar surroundings, someone suddenly approaches you.",
  },
  {
    background: bgIMAGES.Inn,
    system: false,
    text: "'Hello, traveler… would you mind helping me?'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Welcome to our family inn! My name is Eto.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "You look like you're new here… not many people wander around with that lost expression.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "This town can be overwhelming at first. Travelers come and go, but not everyone knows where to start.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Why don’t you rest here for a while? I can tell you everything you need to know… for a small favor, of course.",
  },
  {
    system: true,
    text: "You feel like this might be the start of something.",
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
];


// the woman takes the soup and give you Minthril Dagger LVL 5
export const chapter0_4 = [
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "The streets are busy, filled with merchants shouting and people rushing past. You stand still, unsure which shop to enter.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "Lost in thought, you accidentally bump into someone in the market district.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "You’ve only just arrived… maybe it’s best to rest and gather information about this town first.",
  },
  {
    background: bgIMAGES.Inn,
    system: true,
    text: "As you wander aimlessly, taking in the unfamiliar surroundings, someone suddenly approaches you.",
  },
  {
    background: bgIMAGES.Inn,
    system: false,
    text: "'Hello, traveler… would you mind helping me?'",
  },
  {
    system: false,
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Welcome to our family inn! My name is Eto.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "You look like you're new here… not many people wander around with that lost expression.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "This town can be overwhelming at first. Travelers come and go, but not everyone knows where to start.",
  },
  {
    background: bgIMAGES.Inn,
    leftImg: storyPortraitImages.InnKeeper,
    speakerName: "Eto",
    text: "Why don’t you rest here for a while? I can tell you everything you need to know… for a small favor, of course.",
  },
  {
    system: true,
    text: "You feel like this might be the start of something.",
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
];
